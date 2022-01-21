import { DialogContext } from "@app/providers/DialogProvider";
import { useContext } from "react";

export default function useDialog() {
  const { showDialog, dismissDialog } = useContext(DialogContext);
  return { showDialog, dismissDialog };
}
