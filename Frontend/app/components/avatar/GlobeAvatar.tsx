import React from "react";
import type {
  BufferGeometry,
  Group,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Points,
  Scene,
  Sprite,
  Texture,
  WebGLRenderer,
} from "three";
import GlobeStoryCard from "./GlobeStoryCard";
import {
  PLACE_CONNECTIONS,
  PLACE_STORIES,
  getPlaceById,
  type PlaceId,
} from "./data/placeStories";

type GlobeAvatarProps = {
  className?: string;
};

type PlaceLabel = {
  sprite: Sprite;
  normal: InstanceType<typeof import("three").Vector3>;
  placeId: PlaceId;
};

type MarkerHit = {
  placeId: PlaceId;
  group: Group;
  core: Mesh;
  glow: Mesh;
  normal: InstanceType<typeof import("three").Vector3>;
};

const RADIUS = 1.55;
const PRIMARY = 0x4db5ff;
const ACCENT = 0x6fffc7;
const CORE = 0x0a2a24;

const latLonToVector = (
  THREE: typeof import("three"),
  lat: number,
  lon: number,
  radius: number
) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

const createArcCurve = (
  THREE: typeof import("three"),
  start: InstanceType<typeof import("three").Vector3>,
  end: InstanceType<typeof import("three").Vector3>,
  altitude = 1.28
) => {
  const mid = start.clone().add(end).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(RADIUS * altitude);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
};

const createPlaceLabel = (THREE: typeof import("three"), name: string) => {
  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
  const fontSize = 28;
  const padX = 18;
  const padY = 10;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  ctx.font = `600 ${fontSize}px Poppins, "Segoe UI", sans-serif`;
  const textWidth = Math.ceil(ctx.measureText(name).width);
  const width = textWidth + padX * 2;
  const height = fontSize + padY * 2;
  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const radius = height / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(4, 28, 24, 0.88)";
  ctx.strokeStyle = "rgba(77, 181, 255, 0.85)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.arcTo(width, 0, width, height, radius);
  ctx.arcTo(width, height, 0, height, radius);
  ctx.arcTo(0, height, 0, 0, radius);
  ctx.arcTo(0, 0, width, 0, radius);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#e8f7ff";
  ctx.font = `600 ${fontSize}px Poppins, "Segoe UI", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name, width / 2, height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  if ("colorSpace" in texture) {
    (texture as Texture & { colorSpace: string }).colorSpace =
      (THREE as typeof import("three") & { SRGBColorSpace?: string }).SRGBColorSpace ?? "srgb";
  }

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    opacity: 1,
  });
  const sprite = new THREE.Sprite(material);
  const aspect = width / height;
  const labelHeight = 0.32;
  sprite.scale.set(labelHeight * aspect, labelHeight, 1);
  sprite.center.set(0.5, 0);

  return { sprite, texture, material };
};

const GlobeAvatar = ({ className }: GlobeAvatarProps) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = React.useState(false);
  const [activePlaceId, setActivePlaceId] = React.useState<PlaceId | null>(null);
  const [hintVisible, setHintVisible] = React.useState(true);

  const activePlaceIdRef = React.useRef<PlaceId | null>(null);
  const selectPlaceRef = React.useRef<(id: PlaceId) => void>(() => undefined);
  const placeShotRef = React.useRef<HTMLDivElement | null>(null);
  const zoomProgressRef = React.useRef(0);

  const selectPlace = React.useCallback((id: PlaceId) => {
    activePlaceIdRef.current = id;
    setActivePlaceId(id);
    setHintVisible(false);
  }, []);

  const clearPlace = React.useCallback(() => {
    activePlaceIdRef.current = null;
    setActivePlaceId(null);
  }, []);

  React.useEffect(() => {
    selectPlaceRef.current = selectPlace;
  }, [selectPlace]);

  React.useEffect(() => {
    activePlaceIdRef.current = activePlaceId;
  }, [activePlaceId]);

  React.useEffect(() => {
    if (!activePlaceId) {
      return;
    }
    const onPointerDownOutside = (event: PointerEvent) => {
      const root = rootRef.current;
      if (root && event.target instanceof Node && !root.contains(event.target)) {
        clearPlace();
      }
    };
    document.addEventListener("pointerdown", onPointerDownOutside);
    return () => document.removeEventListener("pointerdown", onPointerDownOutside);
  }, [activePlaceId, clearPlace]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") {
      return;
    }

    let disposed = false;
    let renderer: WebGLRenderer | null = null;
    let scene: Scene | null = null;
    let camera: PerspectiveCamera | null = null;
    let globeGroup: Group | null = null;
    let markers: MarkerHit[] = [];
    let placeLabels: PlaceLabel[] = [];
    let starField: Points | null = null;
    let atmosphere: Mesh | null = null;
    let outerRing: Mesh | null = null;
    let animationId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;
    let isVisible = true;
    let reduceMotion = false;
    let hoverPlaceId: PlaceId | null = null;

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const focus = {
      rotY: -0.55,
      rotX: 0.18,
      rotZ: 0,
      active: false,
      camZ: 5.4,
      camY: 0.15,
      fov: 38,
    };
    const CAM_IDLE = { z: 5.4, y: 0.15, fov: 38 };
    const CAM_ZOOM = { z: 3.55, y: 0.08, fov: 31 };
    const pointerDown = { x: 0, y: 0, active: false };
    const geometries: BufferGeometry[] = [];
    const materials: { dispose: () => void }[] = [];
    const textures: Texture[] = [];

    const trackGeo = <T extends BufferGeometry>(geo: T) => {
      geometries.push(geo);
      return geo;
    };
    const trackMat = <T extends { dispose: () => void }>(mat: T) => {
      materials.push(mat);
      return mat;
    };

    const setCursor = (value: string) => {
      if (container) {
        container.style.cursor = value;
      }
    };

    const shortestAngleDelta = (from: number, to: number) => {
      let delta = to - from;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      return delta;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.targetX = Math.max(-1, Math.min(1, nx));
      pointer.targetY = Math.max(-1, Math.min(1, ny));
    };

    const onPointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      hoverPlaceId = null;
      setCursor(activePlaceIdRef.current ? "default" : "grab");
    };

    let cleanupListeners: (() => void) | null = null;

    const mount = async () => {
      try {
        const THREE = await import("three");
        if (disposed || !container) {
          return;
        }

        reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const width = container.clientWidth || 320;
        const height = container.clientHeight || 320;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
        camera.position.set(0, 0.15, 5.4);

        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height, false);
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.className = "globeAvatar__canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);

        globeGroup = new THREE.Group();
        scene.add(globeGroup);

        const coreGeo = trackGeo(new THREE.SphereGeometry(RADIUS, 64, 64));
        const coreMat = trackMat(
          new THREE.MeshStandardMaterial({
            color: CORE,
            metalness: 0.25,
            roughness: 0.62,
            emissive: 0x07352c,
            emissiveIntensity: 0.55,
          })
        );
        globeGroup.add(new THREE.Mesh(coreGeo, coreMat));

        const gridGeo = trackGeo(new THREE.SphereGeometry(RADIUS * 1.002, 36, 24));
        const gridMat = trackMat(
          new THREE.MeshBasicMaterial({
            color: PRIMARY,
            wireframe: true,
            transparent: true,
            opacity: 0.16,
          })
        );
        globeGroup.add(new THREE.Mesh(gridGeo, gridMat));

        const hexGeo = trackGeo(new THREE.IcosahedronGeometry(RADIUS * 1.01, 2));
        const hexMat = trackMat(
          new THREE.MeshBasicMaterial({
            color: ACCENT,
            wireframe: true,
            transparent: true,
            opacity: 0.09,
          })
        );
        globeGroup.add(new THREE.Mesh(hexGeo, hexMat));

        const atmoGeo = trackGeo(new THREE.SphereGeometry(RADIUS * 1.14, 48, 48));
        const atmoMat = trackMat(
          new THREE.MeshBasicMaterial({
            color: PRIMARY,
            transparent: true,
            opacity: 0.12,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
        globeGroup.add(atmosphere);

        const ringGeo = trackGeo(new THREE.TorusGeometry(RADIUS * 1.42, 0.012, 12, 120));
        const ringMat = trackMat(
          new THREE.MeshBasicMaterial({
            color: PRIMARY,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        outerRing = new THREE.Mesh(ringGeo, ringMat);
        outerRing.rotation.x = Math.PI / 2.6;
        outerRing.rotation.y = 0.35;
        globeGroup.add(outerRing);

        const ring2Geo = trackGeo(new THREE.TorusGeometry(RADIUS * 1.58, 0.008, 10, 100));
        const ring2Mat = trackMat(
          new THREE.MeshBasicMaterial({
            color: ACCENT,
            transparent: true,
            opacity: 0.28,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        const outerRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
        outerRing2.rotation.x = Math.PI / 1.85;
        outerRing2.rotation.z = -0.5;
        globeGroup.add(outerRing2);

        const placePositions = PLACE_STORIES.map((place) =>
          latLonToVector(THREE, place.lat, place.lon, RADIUS * 1.015)
        );
        const tmpNormal = new THREE.Vector3();
        const tmpCamDir = new THREE.Vector3();
        const raycaster = new THREE.Raycaster();
        const pointerNdc = new THREE.Vector2();
        const hitTargets: Object3D[] = [];

        placePositions.forEach((pos, index) => {
          const place = PLACE_STORIES[index];
          const normal = pos.clone().normalize();
          const markerGroup = new THREE.Group();
          markerGroup.position.copy(pos);
          markerGroup.lookAt(0, 0, 0);
          markerGroup.userData.placeId = place.id;

          const stemGeo = trackGeo(new THREE.CylinderGeometry(0.012, 0.018, 0.22, 10));
          const stemMat = trackMat(
            new THREE.MeshBasicMaterial({
              color: PRIMARY,
              transparent: true,
              opacity: 0.9,
            })
          );
          const stem = new THREE.Mesh(stemGeo, stemMat);
          stem.position.z = 0.11;
          stem.rotation.x = Math.PI / 2;
          markerGroup.add(stem);

          const markerGeo = trackGeo(new THREE.SphereGeometry(0.07, 18, 18));
          const markerMat = trackMat(
            new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 1,
            })
          );
          const marker = new THREE.Mesh(markerGeo, markerMat);
          marker.position.z = 0.24;
          marker.userData.placeId = place.id;
          markerGroup.add(marker);

          const glowGeo = trackGeo(new THREE.SphereGeometry(0.16, 16, 16));
          const glowMat = trackMat(
            new THREE.MeshBasicMaterial({
              color: PRIMARY,
              transparent: true,
              opacity: 0.45,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            })
          );
          const glow = new THREE.Mesh(glowGeo, glowMat);
          glow.position.z = 0.24;
          glow.userData.placeId = place.id;
          markerGroup.add(glow);

          const haloGeo = trackGeo(new THREE.RingGeometry(0.1, 0.14, 24));
          const haloMat = trackMat(
            new THREE.MeshBasicMaterial({
              color: ACCENT,
              transparent: true,
              opacity: 0.7,
              side: THREE.DoubleSide,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            })
          );
          const halo = new THREE.Mesh(haloGeo, haloMat);
          halo.position.z = 0.02;
          markerGroup.add(halo);

          // Invisible larger hit target for easier tapping
          const hitGeo = trackGeo(new THREE.SphereGeometry(0.28, 12, 12));
          const hitMat = trackMat(
            new THREE.MeshBasicMaterial({
              transparent: true,
              opacity: 0,
              depthWrite: false,
            })
          );
          const hit = new THREE.Mesh(hitGeo, hitMat);
          hit.position.z = 0.2;
          hit.userData.placeId = place.id;
          markerGroup.add(hit);
          hitTargets.push(hit);

          globeGroup!.add(markerGroup);
          markers.push({
            placeId: place.id,
            group: markerGroup,
            core: marker,
            glow,
            normal: normal.clone(),
          });

          const label = createPlaceLabel(THREE, place.name);
          if (label) {
            textures.push(label.texture);
            materials.push(label.material);
            label.sprite.position.copy(normal.clone().multiplyScalar(RADIUS * 1.32));
            label.sprite.userData.placeId = place.id;
            globeGroup!.add(label.sprite);
            placeLabels.push({
              sprite: label.sprite,
              normal: normal.clone(),
              placeId: place.id,
            });
            hitTargets.push(label.sprite);
          }
        });

        PLACE_CONNECTIONS.forEach(([a, b]) => {
          const curve = createArcCurve(THREE, placePositions[a], placePositions[b]);
          const points = curve.getPoints(48);
          const arcGeo = trackGeo(new THREE.BufferGeometry().setFromPoints(points));
          const arcMat = trackMat(
            new THREE.LineBasicMaterial({
              color: PRIMARY,
              transparent: true,
              opacity: 0.55,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            })
          );
          globeGroup!.add(new THREE.Line(arcGeo, arcMat));
        });

        const starCount = window.innerWidth < 600 ? 80 : 140;
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i += 1) {
          const r = RADIUS * (1.7 + Math.random() * 1.4);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          starPositions[i * 3 + 1] = r * Math.cos(phi);
          starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        }
        const starGeo = trackGeo(new THREE.BufferGeometry());
        starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        const starMat = trackMat(
          new THREE.PointsMaterial({
            color: 0xb8e7ff,
            size: 0.025,
            transparent: true,
            opacity: 0.7,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true,
          })
        );
        starField = new THREE.Points(starGeo, starMat);
        scene.add(starField);

        const ambient = new THREE.AmbientLight(0x6aa89a, 0.55);
        scene.add(ambient);
        const key = new THREE.DirectionalLight(PRIMARY, 1.15);
        key.position.set(4, 2.5, 3);
        scene.add(key);
        const fill = new THREE.DirectionalLight(ACCENT, 0.45);
        fill.position.set(-3, -1.5, 2);
        scene.add(fill);

        globeGroup.rotation.y = focus.rotY;
        globeGroup.rotation.x = focus.rotX;

        const pickPlaceId = (clientX: number, clientY: number): PlaceId | null => {
          if (!camera || !renderer) {
            return null;
          }
          const rect = renderer.domElement.getBoundingClientRect();
          pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
          pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(pointerNdc, camera);
          const hits = raycaster.intersectObjects(hitTargets, false);
          const placeId = hits[0]?.object.userData.placeId as PlaceId | undefined;
          return placeId ?? null;
        };

        const onPointerDown = (event: PointerEvent) => {
          pointerDown.active = true;
          pointerDown.x = event.clientX;
          pointerDown.y = event.clientY;
        };

        const onPointerUp = (event: PointerEvent) => {
          if (!pointerDown.active) {
            return;
          }
          pointerDown.active = false;
          const dx = event.clientX - pointerDown.x;
          const dy = event.clientY - pointerDown.y;
          if (Math.hypot(dx, dy) > 8) {
            return;
          }
          const placeId = pickPlaceId(event.clientX, event.clientY);
          if (placeId) {
            selectPlaceRef.current(placeId);
          }
        };

        const onMoveWithPick = (event: PointerEvent) => {
          onPointerMove(event);
          const placeId = pickPlaceId(event.clientX, event.clientY);
          hoverPlaceId = placeId;
          if (placeId) {
            setCursor("pointer");
          } else {
            setCursor(activePlaceIdRef.current ? "default" : "grab");
          }
        };

        const handleResize = () => {
          if (!renderer || !camera || !container) {
            return;
          }
          const w = container.clientWidth || 320;
          const h = container.clientHeight || 320;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.setSize(w, h, false);
        };

        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
          },
          { threshold: 0.1 }
        );
        visibilityObserver.observe(container);

        container.addEventListener("pointermove", onMoveWithPick);
        container.addEventListener("pointerleave", onPointerLeave);
        container.addEventListener("pointerdown", onPointerDown);
        container.addEventListener("pointerup", onPointerUp);

        const clock = new THREE.Clock();
        const focusQuat = new THREE.Quaternion();
        const focusEuler = new THREE.Euler();
        const faceCamera = new THREE.Vector3(0, 0, 1);

        const animate = () => {
          if (disposed || !renderer || !scene || !camera || !globeGroup) {
            return;
          }
          animationId = window.requestAnimationFrame(animate);

          if (!isVisible) {
            return;
          }

          const activeCamera = camera;
          const activeGlobe = globeGroup;
          const activeRenderer = renderer;
          const activeScene = scene;
          const selectedId = activePlaceIdRef.current;

          // IMPORTANT: getDelta() first — getElapsedTime() also consumes delta
          const dt = Math.min(clock.getDelta(), 0.05);
          const t = clock.elapsedTime;
          pointer.x += (pointer.targetX - pointer.x) * 0.06;
          pointer.y += (pointer.targetY - pointer.y) * 0.06;

          if (selectedId) {
            const selected = markers.find((marker) => marker.placeId === selectedId);
            if (selected) {
              // Rotate globe so the place normal faces the camera (+Z)
              focusQuat.setFromUnitVectors(selected.normal, faceCamera);
              focusEuler.setFromQuaternion(focusQuat, "XYZ");
              focus.rotY = focusEuler.y;
              focus.rotX = focusEuler.x;
              focus.rotZ = focusEuler.z;
              focus.active = true;
              focus.camZ = CAM_ZOOM.z;
              focus.camY = CAM_ZOOM.y;
              focus.fov = CAM_ZOOM.fov;
            }
          } else {
            focus.active = false;
            focus.camZ = CAM_IDLE.z;
            focus.camY = CAM_IDLE.y;
            focus.fov = CAM_IDLE.fov;
            focus.rotX = 0.18;
            focus.rotZ = 0;
          }

          const tiltScale = focus.active ? 0.04 : 0.22;
          const rotSpeed = reduceMotion ? 18 : focus.active ? 1.15 : 2.4;
          const camSpeed = reduceMotion ? 18 : focus.active ? 0.8 : 1.7;
          const rotAlpha = 1 - Math.exp(-rotSpeed * dt);
          const camAlpha = 1 - Math.exp(-camSpeed * dt);

          if (focus.active) {
            const targetX = focus.rotX + pointer.y * tiltScale;
            const targetZ = focus.rotZ + pointer.x * -0.03;
            activeGlobe.rotation.x += (targetX - activeGlobe.rotation.x) * rotAlpha;
            activeGlobe.rotation.y +=
              shortestAngleDelta(activeGlobe.rotation.y, focus.rotY) * rotAlpha;
            activeGlobe.rotation.z += (targetZ - activeGlobe.rotation.z) * rotAlpha;
          } else {
            // Idle: keep a continuous spin (don't lerp-fight the spin target)
            if (!reduceMotion) {
              activeGlobe.rotation.y += 0.14 * dt;
            }
            const targetX = focus.rotX + pointer.y * tiltScale;
            const targetZ = focus.rotZ + pointer.x * -0.18;
            activeGlobe.rotation.x += (targetX - activeGlobe.rotation.x) * rotAlpha;
            activeGlobe.rotation.z += (targetZ - activeGlobe.rotation.z) * rotAlpha;
          }

          activeGlobe.updateMatrixWorld(true);

          activeCamera.position.z += (focus.camZ - activeCamera.position.z) * camAlpha;
          activeCamera.position.y += (focus.camY - activeCamera.position.y) * camAlpha;
          activeCamera.fov += (focus.fov - activeCamera.fov) * camAlpha;
          activeCamera.updateProjectionMatrix();

          const zoomRange = CAM_IDLE.z - CAM_ZOOM.z;
          const zoomAmount =
            zoomRange <= 0
              ? 0
              : Math.max(0, Math.min(1, (CAM_IDLE.z - activeCamera.position.z) / zoomRange));
          const shotOpacity = focus.active
            ? Math.max(0, Math.min(1, (zoomAmount - 0.25) / 0.6))
            : 0;
          zoomProgressRef.current = shotOpacity;
          if (placeShotRef.current) {
            placeShotRef.current.style.opacity = String(shotOpacity);
            placeShotRef.current.style.transform = `scale(${1.1 - shotOpacity * 0.1})`;
          }

          if (outerRing && !reduceMotion) {
            outerRing.rotation.z += 0.003;
          }
          if (starField && !reduceMotion) {
            starField.rotation.y -= 0.0006;
            starField.rotation.x += 0.0002;
          }

          markers.forEach((marker, index) => {
            const isSelected = marker.placeId === selectedId;
            const isHovered = marker.placeId === hoverPlaceId;
            const pulse = 1 + Math.sin(t * 2.2 + index * 1.3) * (isSelected ? 0.32 : 0.18);
            marker.core.scale.setScalar(
              reduceMotion ? (isSelected ? 1.25 : 1) : pulse * (isSelected ? 1.2 : 1)
            );
            const glowMat = marker.glow.material as InstanceType<
              typeof import("three").MeshBasicMaterial
            >;
            glowMat.opacity = isSelected ? 0.8 : isHovered ? 0.62 : 0.45;
            glowMat.color.setHex(isSelected ? ACCENT : PRIMARY);
          });

          placeLabels.forEach((label, index) => {
            tmpNormal.copy(label.normal).transformDirection(activeGlobe.matrixWorld);
            tmpCamDir.copy(activeCamera.position).normalize();
            const facing = tmpNormal.dot(tmpCamDir);
            const mat = label.sprite.material as InstanceType<
              typeof import("three").SpriteMaterial
            >;
            // Hide floating 3D name tags while a place photo fills the orb
            const visible = !selectedId && facing > 0.08;
            label.sprite.visible = visible;
            if (visible) {
              mat.opacity = Math.min(1, 0.4 + facing * 1.05);
              const bob = reduceMotion ? 0 : Math.sin(t * 1.6 + index) * 0.012;
              label.sprite.position
                .copy(label.normal)
                .multiplyScalar(RADIUS * (1.32 + bob));
            }
          });

          if (atmosphere && !reduceMotion) {
            const mat = atmosphere.material as InstanceType<
              typeof import("three").MeshBasicMaterial
            >;
            mat.opacity = 0.1 + Math.sin(t * 0.9) * 0.03;
          }

          activeRenderer.render(activeScene, activeCamera);
        };

        animate();

        cleanupListeners = () => {
          container.removeEventListener("pointermove", onMoveWithPick);
          container.removeEventListener("pointerleave", onPointerLeave);
          container.removeEventListener("pointerdown", onPointerDown);
          container.removeEventListener("pointerup", onPointerUp);
        };
      } catch {
        if (!disposed) {
          setFailed(true);
        }
      }
    };

    mount();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationId);
      cleanupListeners?.();
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();

      geometries.forEach((geo) => geo.dispose());
      materials.forEach((mat) => mat.dispose());
      textures.forEach((texture) => texture.dispose());

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentElement === container) {
          container.removeChild(renderer.domElement);
        }
      }

      renderer = null;
      scene = null;
      camera = null;
      globeGroup = null;
      markers = [];
      placeLabels = [];
      starField = null;
      atmosphere = null;
      outerRing = null;
    };
  }, []);

  const activePlace = activePlaceId ? getPlaceById(activePlaceId) : null;
  const orbPhoto = activePlace?.images[0] ?? null;

  return (
    <div
      ref={rootRef}
      className={`globeAvatar ${failed ? "globeAvatar--fallback" : ""} ${
        activePlaceId ? "globeAvatar--exploring" : ""
      } ${className ?? ""}`.trim()}
    >
      <div className="globeAvatar__orb">
        <div ref={containerRef} className="globeAvatar__stage" />
        <div className="globeAvatar__glow" aria-hidden="true" />
        <div className="globeAvatar__haze" aria-hidden="true" />
        {orbPhoto && activePlace && (
          <div
            ref={placeShotRef}
            className="globeAvatar__placeReveal"
            aria-hidden="true"
            style={{ opacity: 0 }}
          >
            <p className="globeAvatar__placeLabel">
              <span className="globeAvatar__placeLabelCity">{activePlace.city}</span>
              <span className="globeAvatar__placeLabelCountry">{activePlace.name}</span>
            </p>
            <div className="globeAvatar__placeShot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={orbPhoto.src} alt="" />
              <div className="globeAvatar__placeShotFade" />
            </div>
          </div>
        )}
      </div>

      {hintVisible && !activePlaceId && (
        <p className="globeAvatar__hint" aria-live="polite">
          Tap a home to explore
        </p>
      )}

      <div className="globeAvatar__legend" role="group" aria-label="Places marked on the globe">
        <span className="globeAvatar__legendLabel">Homes</span>
        {PLACE_STORIES.map((place) => {
          const isActive = activePlaceId === place.id;
          return (
            <button
              key={place.id}
              type="button"
              className={`globeAvatar__legendItem${isActive ? " is-active" : ""}`}
              aria-pressed={isActive}
              aria-label={`${place.name}, ${place.city}`}
              title={place.city}
              onClick={() => (isActive ? clearPlace() : selectPlace(place.id))}
            >
              {place.city}
            </button>
          );
        })}
      </div>

      {activePlaceId && (
        <GlobeStoryCard
          placeId={activePlaceId}
          onClose={clearPlace}
          onSelect={selectPlace}
        />
      )}
    </div>
  );
};

export default GlobeAvatar;
