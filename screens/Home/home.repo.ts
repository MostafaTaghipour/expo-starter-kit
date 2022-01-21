import { HomeRepoProps } from "./home.type";

export const useHomeRepo = ({}: HomeRepoProps) => {

  const aRepoMethod = () => {
    console.log("aRepoMethod");
  };
  return {  aRepoMethod };
};
