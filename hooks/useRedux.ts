import { RootState } from "@app/store";
import { useDispatch, useSelector } from "react-redux";

export default function useRedux<TState = RootState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) {
  const state = useSelector<TState, TSelected>(selector, equalityFn);
  const dispatch = useDispatch();

  return {
    state,
    dispatch,
  };
}
