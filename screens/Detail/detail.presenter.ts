import { useAppLocale } from "@app/hooks";
import { useLayoutEffect } from "react";
import { DetailPresenterProps } from "./detail.type";

export const useDetailPresenter = ({
  navigation,
  repo,
}: DetailPresenterProps) => {
  const { t } = useAppLocale();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("detail.title"),
    });
  }, []);

  const onButtonClick = () => {
    repo.aRepoMethod();
  };

  return { onButtonClick };
};
