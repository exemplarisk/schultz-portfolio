import React from "react";
import Image from "next/image";

type PortfolioAvatarProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

const PortfolioAvatar = ({ src, alt, priority = false }: PortfolioAvatarProps) => {
  return (
    <div className="portfolioAvatar" aria-hidden="true">
      <div className="portfolioAvatar__glow" />
      <div className="portfolioAvatar__ring" />
      <div className="portfolioAvatar__frame">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          priority={priority}
          sizes="(max-width: 768px) 70vw, 40vw"
        />
      </div>
    </div>
  );
};

export default PortfolioAvatar;
