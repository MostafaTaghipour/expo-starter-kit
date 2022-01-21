import useAppLocale from "@app/hooks/useAppLocale";
import { SettingsPresenterProps } from "./settings.type";

export const useSettingsPresenter = ({
  navigation,
  repo,
}: SettingsPresenterProps) => {

  const onButtonClick = () => {
    repo.aRepoMethod();
  };

  return { onButtonClick };
};
