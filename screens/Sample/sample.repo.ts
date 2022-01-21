import { SampleRepoProps } from "./sample.type";

export const useSampleRepo = (props: SampleRepoProps) => {

  const aRepoMethod = () => {
    console.log("aRepoMethod");
  };
  return {  aRepoMethod };
};
