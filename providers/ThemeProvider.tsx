import ThemeManager from "@app/helpers/ThemeManager";
import React, { useMemo } from "react";
import { useColorScheme } from "react-native-appearance";

export const ThemeContext = React.createContext({ dark: false });

export function ThemeProvider(props: React.PropsWithChildren<{}>) {
  const colorScheme = useColorScheme();
  const value = useMemo(
    () => ({
      dark: ThemeManager.isDark,
    }),
    [colorScheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}
