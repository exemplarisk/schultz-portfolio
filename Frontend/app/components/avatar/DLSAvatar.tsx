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
  idleRotation: boolean; 
  cameraInitialDistance: number;
  cameraTarget: number;
}

function DLSAvatar({ modelSrc, animationSrc, idleRotation, cameraInitialDistance, cameraTarget }: DLSAvatarProps) {

  return (
    <Avatar
      idleRotation={idleRotation}
      modelSrc={modelSrc}
      animationSrc={animationSrc}
      cameraInitialDistance={cameraInitialDistance}
      shadows={true}
      cameraTarget={cameraTarget}
    />
  );
}

export default DLSAvatar;