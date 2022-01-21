import { useAppLocale } from "@app/hooks";
import React from "react";
import { SamplePresenterProps } from "./sample.type";

export const useSamplePresenter = (props: SamplePresenterProps) => {
  const { t } = useAppLocale();
  //@ts-ignore
  const { naviation, repo } = props;

  React.useLayoutEffect(() => {
    //@ts-ignore
    navigation.setOptions({
      title: t("sample.title"),
    });
  }, []);

  const onButtonClick = () => {
    repo.aRepoMethod();
  };

  return { onButtonClick };
};
