import { useSampleRepo } from "./sample.repo";
import { sampleStyles } from "./sample.style";
import { useSamplePresenter } from "./sample.presenter";
import { commonStyles } from "@app/constants/Classifications";
//@ts-ignore
import { SampleStackNavigationProps } from "@app/navigation/types";

const style = { ...sampleStyles, ...commonStyles };
export declare type SampleStyleType = typeof style;
export declare type SampleRepoType = ReturnType<typeof useSampleRepo>;
export declare type SamplePresenterType = ReturnType<typeof useSamplePresenter>;

//@ts-ignore
export interface SamplePresenterProps extends SampleStackNavigationProps<"SampleScreen"> {
  repo: SampleRepoType;
}

export interface SampleUIProps {
  presenter: SamplePresenterType;
  styles: SampleStyleType;
}

export interface SampleRepoProps {}
