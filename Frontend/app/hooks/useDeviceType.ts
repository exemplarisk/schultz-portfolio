import { useState, useEffect } from 'react';

export enum DeviceType {
  Mobile,
  Tablet,
  Desktop,
}

export const useDeviceType = (): DeviceType => {

  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.Desktop);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType(DeviceType.Mobile);
      } else if (width >= 768 && width <= 1024) {
        setDeviceType(DeviceType.Tablet);
      } else {
        setDeviceType(DeviceType.Desktop);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceType;
};