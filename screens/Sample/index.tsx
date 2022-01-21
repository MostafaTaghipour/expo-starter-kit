import { useSamplePresenter } from "./sample.presenter";
import React from "react";
import { sampleStyles } from "./sample.style";
import { SampleUI } from "./sample.ui";
import { useSampleRepo } from "./sample.repo";
import { commonStyles } from "@app/constants/Classifications";
//@ts-ignore
import { SampleStackNavigationProps } from "@app/navigation/types";


export default function SampleScreen({
  navigation,
  route,
}: //@ts-ignore
SampleStackNavigationProps<"SampleScreen">) {
  const repo = useSampleRepo({});
  const presenter = useSamplePresenter({
    //@ts-ignore
    navigation,
    route,
    repo,
  });

  return (
    <SampleUI
      styles={{ ...sampleStyles, ...commonStyles }}
      presenter={presenter}
    />
  );
}
