import * as Device from "expo-device";
import Constant from "expo-constants";
import { Platform } from "react-native";
import { useEffect, useState } from "react";


export default function useDeviceInfo() {
  const { deviceId, platform } = Constant;
  const { isDevice } = Device;
  const [deviceType, setDeviceType] = useState(Device.DeviceType.UNKNOWN);

  useEffect(() => {
    async function getDeviceTypeAsync() {
      const type: Device.DeviceType = await Device.getDeviceTypeAsync();
      setDeviceType(type);
    }

    getDeviceTypeAsync();

    return () => {};
  }, []);

  return {
    deviceId,
    platform,
    isSimulator: !isDevice,
    isWeb: Platform.OS == "web",
    isAndroid: Platform.OS == "android",
    isIos: Platform.OS == "ios",
    deviceType: deviceType,
    isPhone: deviceType == Device.DeviceType.PHONE,
    isTablet: deviceType == Device.DeviceType.TABLET,
    isDesktop: deviceType == Device.DeviceType.DESKTOP,
    isTV: deviceType == Device.DeviceType.TV,
    ...Device,
  };
}
