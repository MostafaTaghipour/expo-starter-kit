import * as Application from "expo-application";
import Constant from "expo-constants";

export default function useAppInfo() {
  const { installationId, sessionId, appOwnership } = Constant;
  let {
    nativeApplicationVersion,
    nativeBuildVersion,
    ...otherProps
  } = Application;

  if (appOwnership == "expo") {
    nativeApplicationVersion = "1.0.0";
    nativeBuildVersion = "1";
  }

  return {
    installationId,
    sessionId,
    nativeApplicationVersion,
    nativeBuildVersion: nativeBuildVersion ? +nativeBuildVersion : 0 ,
    ...otherProps,
  };
}
