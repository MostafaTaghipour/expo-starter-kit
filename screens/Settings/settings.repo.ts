import { SettingsRepoProps } from "./settings.type";

export const useSettingsRepo = ({}: SettingsRepoProps) => {

  const aRepoMethod = () => {
    console.log("aRepoMethod");
  };
  return {  aRepoMethod };
};
