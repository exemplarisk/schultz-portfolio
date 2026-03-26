import React from "react";
import dynamic from "next/dynamic";
import { AvatarProps } from '@readyplayerme/visage';

const Avatar = dynamic<AvatarProps>(
  () => import("@readyplayerme/visage").then((mod) => mod.Avatar as any),
  { ssr: false }
);

interface DLSAvatarProps {
  modelSrc: string;
  animationSrc?: string | Blob;
  idleRotation: boolean; 
  cameraInitialDistance: number;
  cameraTarget: number;
}

type AvatarErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
};

type AvatarErrorBoundaryState = {
  hasError: boolean;
};

class AvatarErrorBoundary extends React.Component<AvatarErrorBoundaryProps, AvatarErrorBoundaryState> {
  state: AvatarErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AvatarErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}

function DLSAvatar({ modelSrc, animationSrc, idleRotation, cameraInitialDistance, cameraTarget }: DLSAvatarProps) {
  const [useAnimation, setUseAnimation] = React.useState(false);
  const [animationBlob, setAnimationBlob] = React.useState<Blob | null>(null);

  React.useEffect(() => {
    if (!animationSrc) {
      setUseAnimation(false);
      setAnimationBlob(null);
      return;
    }

    if (typeof animationSrc === "object" && animationSrc instanceof Blob) {
      setAnimationBlob(animationSrc);
      setUseAnimation(true);
      return;
    }

    let cancelled = false;

    setUseAnimation(false);
    setAnimationBlob(null);

    fetch(animationSrc)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Animation asset not found: ${animationSrc}`);
        }
        return response.blob();
      })
      .then((blob) => {
        if (!cancelled) {
          setAnimationBlob(blob);
          setUseAnimation(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUseAnimation(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [animationSrc]);

  return (
    <AvatarErrorBoundary
      key={useAnimation ? "animated" : "static"}
      onError={() => setUseAnimation(false)}
    >
      <Avatar
        idleRotation={idleRotation}
        modelSrc={modelSrc}
        animationSrc={useAnimation ? animationBlob ?? animationSrc : undefined}
        cameraInitialDistance={cameraInitialDistance}
        shadows={true}
        cameraTarget={cameraTarget}
      />
    </AvatarErrorBoundary>
  );
}

export default DLSAvatar;