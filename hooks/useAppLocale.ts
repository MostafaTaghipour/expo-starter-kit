import { LocalizationContext } from "@app/providers/LocalizationProvider";
import { useContext } from "react";


export default function useAppLocale() {
    const { isRTL, setLocale, locale, t } = useContext(LocalizationContext);
    return { isRTL, setLocale, locale, t }
}