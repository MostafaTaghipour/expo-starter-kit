import Fonts from "@app/constants/Fonts";
import Theme from "@app/constants/Theme";
import { Appearance } from "react-native-appearance";
import I18N from "@app/helpers/I18N";
import { ThemeType } from "@app/types";

export default {
  get isDark() {
    const scheme = Appearance.getColorScheme();
    return scheme == "dark";
  },

  get theme() {
    const theme = this.isDark ? Theme["dark"] : Theme["light"];
    return theme;
  },

  get reverseTheme() {
    const theme = this.isDark ? Theme["light"] : Theme["dark"];
    return theme;
  },

  get colors() {
    const theme = this.isDark ? Theme["dark"] : Theme["light"];
    return theme.colors;
  },



  
  selectTheme<T>(
    specifics:
      | ({ [theme in ThemeType]?: T } & { default: T })
      | { [theme in ThemeType]: T }
  ): T {
    return this.isDark ? specifics.dark! : specifics.light!;
  },
};
