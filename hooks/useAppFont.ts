import Fonts from "@app/constants/Fonts";
import { LocalizationContext } from "@app/providers/LocalizationProvider";
import { useContext } from "react";
import Constant from "expo-constants";


export default function useAppFont() {
  const { locale } = useContext(LocalizationContext);
  const { light, bold, regular } = Fonts[
    locale == "fa" ? "iranYekan" : "rubik"
  ];
  return { light, bold, regular, systemFonts: Constant.systemFonts };
}
