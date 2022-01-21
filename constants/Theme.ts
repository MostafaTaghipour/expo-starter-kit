import { hexToRGB } from "@app/helpers/UIHelper";
import { Platform } from "react-native";

const defaultTheme = {
  colors: {
    brand: "#1d7ce0",
    text: "#000",
    textSecondary: hexToRGB("#000000", 0.7),
    background: "#fff",
    surface: "#fff",
    border: "#9090907d",
    disable: "#75757591",
    info: "#399CF2",
    warning: "#f0ad4e",
    danger: "#d9534f",
    success: "#0caa49",
  },
  roundness: 9,
  elevation: 4,
  tranclucent: Platform.select({ ios: true, default: false }),
  defaultPadding: Platform.select({ ios: 12, default: 16 }),
};

const darkTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    text: "#fff",
    textSecondary: hexToRGB("#ffffff", 0.7),
    background: "#131313",
    surface: "#1f1f1f",
  },
};

export default {
  light: defaultTheme,
  dark: darkTheme,
};
