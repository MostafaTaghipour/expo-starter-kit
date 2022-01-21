import { BottomSheetContext } from "@app/providers/BottomSheetProvider";
import { useContext } from "react";

export default function useBottomSheet() {
  const bottomSheet = useContext(BottomSheetContext);
  return { ...bottomSheet };
}
