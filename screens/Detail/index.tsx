import { useDetailPresenter } from "./detail.presenter";
import React from "react";
import { detailStyles } from "./detail.style";
import { DetailUI } from "./detail.ui";
import { useDetailRepo } from "./detail.repo";
import { commonStyles } from "@app/constants/Classifications";
import { HomeStackNavigationProps } from "@app/navigation/types";

export default function DetailScreen({
  navigation,
  route,
}: HomeStackNavigationProps<"DetailScreen">) {
  const repo = useDetailRepo({});
  const presenter = useDetailPresenter({
    navigation,
    route,
    repo,
  });

  return (
    <DetailUI
      styles={{ ...detailStyles, ...commonStyles }}
      presenter={presenter}
    />
  );
}
