import { useContext } from "react";
import Theme from "../constants/Theme";
import { ThemeContext } from "../providers/ThemeProvider";

export default function useAppTheme() {
  const { dark } = useContext(ThemeContext);
  return {
    dark,
    theme: Theme[dark ? "dark" : "light"],
    reverse: Theme[dark ? "light" : "dark"],
  };
}
