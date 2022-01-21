//@ts-ignore
import * as Updates from "expo-updates";
import { Platform } from "react-native";
import {encode , decode} from 'base-64'
// import RNRestart from "react-native-restart";

/**
 * in bare workflow use react-native-restart instead of expo-updates
 * https://github.com/avishayil/react-native-restart
 */
export const restartApp = async () => {
  if (Platform.OS == "web") window.location.reload();
  else Updates.reloadAsync(); // RNRestart.Restart();
};


export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const encodeBase64 = (value: any) => {
  return encode(unescape(encodeURIComponent(value)));
};
export const decodeBase64 = (value: string) => {
  return decodeURIComponent(escape(decode(value)));
};
