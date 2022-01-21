import { Dialog, DialogProps } from "@app/components/UIKit";
import { DialogRef } from "@app/components/UIKit/Dialog";
import React from "react";

export const DialogContext = React.createContext<{
  showDialog: (content: React.ReactNode, props: DialogProps) => any;
  dismissDialog: () => any;
}>({
  showDialog: () => {},
  dismissDialog: () => {},
});

export function DialogProvider(props: React.PropsWithChildren<{}>) {
  const [dialogProps, setDialogProps] = React.useState({});
  const [content, setContent] = React.useState<React.ReactNode>();
  const dialogRef = React.useRef<DialogRef>(null);

  const showDialog = (content: React.ReactNode, props?: DialogProps) => {
    setContent(content);
    setDialogProps({
      ...props,
    });

    dialogRef.current?.show();
  };
  const dismissDialog = () => {
    dialogRef.current?.dismiss(() => {
      setContent(null);
      setDialogProps({});
    });
  };

  return (
    <>
      <DialogContext.Provider value={{ showDialog, dismissDialog }}>
        {props.children}
      </DialogContext.Provider>
      <Dialog {...dialogProps} ref={dialogRef}>
        {content}
      </Dialog>
    </>
  );
}
