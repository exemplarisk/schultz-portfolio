import React from "react";
import dynamic from "next/dynamic";

const Avatar = dynamic(
  () => import("@readyplayerme/visage").then((mod) => mod.Avatar),
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