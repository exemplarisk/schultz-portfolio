import React from "react";
import dynamic from "next/dynamic";
import { AvatarProps } from '@readyplayerme/visage';

const Avatar = dynamic<AvatarProps>(
  () => import("@readyplayerme/visage").then((mod) => mod.Avatar as any),
  { ssr: false }
);

interface DLSAvatarProps {
  modelSrc: string;
  animationSrc?: string;
  cameraInitialDistance: number;
}

function DLSAvatar({ modelSrc, animationSrc, cameraInitialDistance }: DLSAvatarProps) {

  return (
      <Avatar
        modelSrc={modelSrc}
        animationSrc={animationSrc}
        cameraInitialDistance={cameraInitialDistance}
        shadows={true}
      />
  );
}

export default DLSAvatar;