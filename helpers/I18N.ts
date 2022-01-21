import i18n, { locale, Scope, TranslateOptions } from "i18n-js"; // or whatever library you want
import fa from "@app/assets/locales/fa.json";
import en from "@app/assets/locales/en.json";
import { DirectionType, PossibleLocales } from "@app/types";
import AsyncStorage from "@react-native-community/async-storage";
import { I18nManager } from "react-native";
import moment from "jalali-moment";
import { restartApp } from "./GeneralHelpers";

const _DEFAULT_LOCALE: PossibleLocales = "fa";
const _LOCALE_KEY = "LOCALE_KEY";
var _locale: PossibleLocales | undefined = undefined;



export default {
  async initAsync(defaultLanguage: PossibleLocales = _DEFAULT_LOCALE) {
    
    i18n.fallbacks = true;
    i18n.translations = { fa, en };

    let storedLocale: PossibleLocales | undefined = undefined;
    try {
      storedLocale = (await AsyncStorage.getItem(
        _LOCALE_KEY
      )) as PossibleLocales;
    } catch (error) {}

    const alreadySetLocale = storedLocale;

    if (!storedLocale) storedLocale = defaultLanguage;

    await this.setLocale(storedLocale, !alreadySetLocale);
  },

  get locale(): PossibleLocales {
    return _locale!;
  },

  get dir(): DirectionType {
    return this.isRTL ? "rtl" : "ltr";
  },

  get isRTL(): boolean {
    return this.isLocaleRTL(this.locale);
  },

  async setLocale(locale: PossibleLocales, restart = false) {
    //set  momentjs locale
    moment.locale(locale);

    if (locale == _locale) return;
    _locale = locale;

    try {
      await AsyncStorage.setItem(_LOCALE_KEY, locale);
    } catch (error) {
      // Error saving data
    }

    // const oldLocaleRTL = I18nManager.isRTL
    const newLocaleRTL = this.isLocaleRTL(locale);

    i18n.locale = locale;
    I18nManager.forceRTL(newLocaleRTL);
    I18nManager.allowRTL(newLocaleRTL);

    if (restart)
      setTimeout(() => {
        restartApp();
      }, 100);
  },

  isLocaleRTL(locale: string): boolean {
    if (!locale) return false;
    return (
      locale.toLowerCase().indexOf("he") === 0 ||
      locale.toLowerCase().indexOf("ar") === 0 ||
      locale.toLowerCase().indexOf("fa") === 0
    );
  },

  t(scope: Scope, options?: TranslateOptions): string {
    return i18n.t(scope, options);
  },

  selectDir<T>(
    specifics:
      | ({ [direction in DirectionType]?: T } & { default: T })
      | { [direction in DirectionType]: T }
  ): T {
    return this.isRTL ? specifics.rtl! : specifics.ltr!;
  },

  selectLocale<T>(
    specifics:
      | ({ [locale in PossibleLocales]?: T } & { default: T })
      | { [locale in PossibleLocales]: T }
  ): T {
    
    return this.locale == "fa" ? specifics.fa! : specifics.en!;
  },
};
