import { DetailRepoProps } from "./detail.type";

export const useDetailRepo = ({}: DetailRepoProps) => {

  const aRepoMethod = () => {
    console.log("aRepoMethod");
  };
  return {  aRepoMethod };
};
