import { useDetailRepo } from "./detail.repo";
import { detailStyles } from "./detail.style";
import { useDetailPresenter } from "./detail.presenter";
import { commonStyles } from "@app/constants/Classifications";
import { HomeStackNavigationProps } from "@app/navigation/types";

const style = { ...detailStyles, ...commonStyles };
export declare type DetailStyleType = typeof style;
export declare type DetailRepoType = ReturnType<typeof useDetailRepo>;
export declare type DetailPresenterType = ReturnType<typeof useDetailPresenter>;


export interface DetailPresenterProps extends HomeStackNavigationProps<"DetailScreen"> {
  repo: DetailRepoType;
}

export interface DetailUIProps {
  presenter: DetailPresenterType;
  styles: DetailStyleType;
}

export interface DetailRepoProps {}
