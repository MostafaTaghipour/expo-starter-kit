
import React from "react";
import { HomePresenterProps } from "./home.type";

export const useHomePresenter = ({ navigation, repo }: HomePresenterProps) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    });
  }, []);

  const onButtonClick = () => {
    repo.aRepoMethod();
  };

  return { onButtonClick };
};
