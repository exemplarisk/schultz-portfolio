import React from 'react'
import CTA from './CTA'
import HeaderSocials from './HeaderSocials';
import DLSAvatar from '../avatar/DLSAvatar';
import { useDeviceType, DeviceType } from '../../utils/useDeviceType';

const Header = () => {
  const deviceType = useDeviceType();
  const modelSrc = "https://models.readyplayer.me/65464e4ce42e04abf894cb73.glb";

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
            {deviceType !== DeviceType.Mobile && <div style={{ pointerEvents: "none" }} className="DLSAvatar">
              <DLSAvatar
                modelSrc={modelSrc}
                animationSrc="/Salute.fbx"
                cameraInitialDistance={5}
                cameraTarget={1.0}
              />
            </div>}
            <HeaderSocials />
            <a href="#contact" className="scroll__down">
              Scroll Down
            </a>
          </div>
        </header>
      </>
    );
}

export default Header