import { useSettingsRepo } from "./settings.repo";
import { settingsStyles } from "./settings.style";
import { useSettingsPresenter } from "./settings.presenter";
import { commonStyles } from "@app/constants/Classifications";
import { SettingsStackNavigationProps } from "@app/navigation/types";

const style = { ...settingsStyles, ...commonStyles };
export declare type SettingsStyleType = typeof style;
export declare type SettingsRepoType = ReturnType<typeof useSettingsRepo>;
export declare type SettingsPresenterType = ReturnType<typeof useSettingsPresenter>;


export interface SettingsPresenterProps extends SettingsStackNavigationProps<"SettingsScreen"> {
  repo: SettingsRepoType;
}

export interface SettingsUIProps {
  presenter: SettingsPresenterType;
  styles: SettingsStyleType;
}

export interface SettingsRepoProps {}
