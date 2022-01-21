import React, { useState } from "react";
import { Scope, TranslateOptions } from "i18n-js"; // or whatever library you want
import I18n from "@app/helpers/I18N";
import { PossibleLocales, TranslateType } from "@app/types";
import { restartApp } from "@app/helpers/GeneralHelpers";

export const LocalizationContext = React.createContext<{
  t: TranslateType;
  isRTL: boolean;
  locale: PossibleLocales;
  setLocale: (locale: PossibleLocales) => any;
}>({
  t: (_scope: Scope, _options?: TranslateOptions) => "",
  isRTL: true,
  locale: "en",
  setLocale: (_locale: PossibleLocales) => {},
});

export const LocalizationProvider: React.FC<{}> = ({ children }) => {
  const [_locale, set_locale] = useState(I18n.locale);

  const localizationContext = React.useMemo(
    () => ({
      t: (scope: Scope, options?: TranslateOptions) => I18n.t(scope, options),
      isRTL: I18n.isRTL,
      locale: _locale,
      setLocale: (locale: PossibleLocales) => {
        if (_locale == locale) return;
        set_locale(locale);
        I18n.setLocale(locale, true);
        // restartApp();
      },
    }),
    [_locale]
  );

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {children}
    </LocalizationContext.Provider>
  );
};
