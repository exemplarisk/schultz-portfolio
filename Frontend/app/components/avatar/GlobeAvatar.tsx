import React from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
}) as React.ComponentType<any>;

type GlobeAvatarProps = {
  className?: string;
};

const DAY_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const NIGHT_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-night.jpg";
const BUMP_TEXTURE =
  "https://unpkg.com/three-globe/example/img/earth-topology.png";

const GlobeAvatar = ({ className }: GlobeAvatarProps) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const globeRef = React.useRef<any>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const updateSize = () => {
      if (!wrapperRef.current) {
        return;
      }
      const bounds = wrapperRef.current.getBoundingClientRect();
      const nextSize = Math.min(bounds.width, bounds.height);
      setSize({ width: nextSize, height: nextSize });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!globeRef.current) {
      return;
    }

    const controls = globeRef.current.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    const loader = new THREE.TextureLoader();
    loader.load(NIGHT_TEXTURE, (texture) => {
      const material = globeRef.current.globeMaterial();
      material.emissiveMap = texture;
      material.emissive = new THREE.Color(0xffffff);
      material.emissiveIntensity = 0.7;
      material.needsUpdate = true;
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`globeAvatar ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      {size.width > 0 && (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          globeImageUrl={DAY_TEXTURE}
          bumpImageUrl={BUMP_TEXTURE}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere
          atmosphereColor="#5fc5ff"
          atmosphereAltitude={0.18}
        />
      )}
    </div>
  );
};

export default GlobeAvatar;
