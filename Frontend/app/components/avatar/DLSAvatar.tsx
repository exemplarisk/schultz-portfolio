import React from "react";
import dynamic from "next/dynamic";
import { AvatarProps } from '@readyplayerme/visage';

const Avatar = dynamic<AvatarProps>(
  () => import("@readyplayerme/visage").then((mod) => mod.Avatar as any),
  { ssr: false }
);

function DLSAvatar() {
  const avatarUrl =
    "https://models.readyplayer.me/65415b4d8b8b05014d60106c.glb";

  return (
    <Avatar modelSrc={avatarUrl} cameraInitialDistance={3} shadows={true} />
  );
}

export default DLSAvatar;