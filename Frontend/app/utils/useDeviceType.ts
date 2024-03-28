import React, { useState } from 'react'

export enum DeviceType {
    Mobile,
    Tablet,
    Desktop,
  }
  
  export const useDeviceType = (): DeviceType => {
    const isSSR = typeof window === "undefined";
    
    const [deviceType, setDeviceType] = useState<DeviceType>(() => {
      const width = isSSR ? 0 : window.innerWidth;
      if (width < 768) return DeviceType.Mobile;
      else if (width >= 768 && width <= 1024) return DeviceType.Tablet;
      else return DeviceType.Desktop;
    });
  
    React.useEffect(() => {
      if (isSSR) return;
  
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 768) setDeviceType(DeviceType.Mobile);
        else if (width >= 768 && width <= 1024) setDeviceType(DeviceType.Tablet);
        else setDeviceType(DeviceType.Desktop);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return deviceType;
  };  