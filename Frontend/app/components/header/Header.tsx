import React from "react";
import dynamic from "next/dynamic";
import CTA from "./CTA";
import HeaderSocials from "./HeaderSocials";

const GlobeAvatar = dynamic(() => import("../avatar/GlobeAvatar"), {
  ssr: false,
  loading: () => (
    <div className="globeAvatar globeAvatar--hero globeAvatar--fallback">
      <div className="globeAvatar__orb" aria-hidden="true">
        <div className="globeAvatar__glow" />
        <div className="globeAvatar__haze" />
      </div>
    </div>
  ),
});

const Header = () => {
  return (
    <>
      <header>
        <div className="container headercontainer">
          <h5 style={{ color: "#959595" }}>Introducing</h5>
          <h1>Jonatan Schultz</h1>
          <h5 className="text-light">
            Ideas Engineer & Miscellaneous Specialist
          </h5>
          <CTA />
          <div className="heroVisual">
            <GlobeAvatar className="globeAvatar--hero" />
          </div>
          <HeaderSocials />
          <a
            href="#contact"
            className="scroll__down"
            aria-label="Scroll down to Contact section"
          >
            Scroll Down
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
