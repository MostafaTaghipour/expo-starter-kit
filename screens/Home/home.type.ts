import { useHomeRepo } from "./home.repo";
import { homeStyles } from "./home.style";
import { useHomePresenter } from "./home.presenter";
import { commonStyles } from "@app/constants/Classifications";
import { HomeStackNavigationProps } from "@app/navigation/types";

const style = { ...homeStyles, ...commonStyles };
export declare type HomeStyleType = typeof style;
export declare type HomeRepoType = ReturnType<typeof useHomeRepo>;
export declare type HomePresenterType = ReturnType<typeof useHomePresenter>;

export interface HomePresenterProps extends HomeStackNavigationProps<"HomeScreen"> {
  repo: HomeRepoType;
}

export interface HomeUIProps {
  presenter: HomePresenterType;
  styles: HomeStyleType;
}

export interface HomeRepoProps {}
