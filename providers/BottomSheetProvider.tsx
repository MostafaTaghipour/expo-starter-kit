import { useAppTheme } from "@app/hooks";
import React from "react";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { TClose, TOpen } from "react-native-modalize/lib/options";

export const BottomSheetContext = React.createContext<{
  showBottomSheet: (
    content: React.ReactNode,
    props?: ModalizeProps,
    dest?: TOpen
  ) => any;
  dismissBottomSheet: (dest?: TClose) => any;
}>({
  showBottomSheet: () => {},
  dismissBottomSheet: () => {},
});

export function BottomSheetProvider(props: React.PropsWithChildren<{}>) {
  const [modalizeProps, setModalizeProps] = React.useState<
    ModalizeProps | undefined
  >({});
  const [content, setContent] = React.useState<React.ReactNode>();
  const { theme } = useAppTheme();

  const modalizeRef = React.useRef<Modalize>(null);

  const showBottomSheet = (
    content: React.ReactNode,
    props?: ModalizeProps,
    dest?: TOpen
  ) => {
    const { modalStyle, handleStyle, ...otherProps } = props || {};
    const bgProp: ModalizeProps = {
      modalStyle: [
        {
          backgroundColor: theme.colors.background,
        },
        modalStyle,
      ],
      handleStyle: [
        {
          backgroundColor: theme.colors.background,
        },
        handleStyle,
      ],
    };
    setContent(content);
    setModalizeProps({ ...bgProp, ...otherProps });
    modalizeRef.current?.open(dest);
  };
  const dismissBottomSheet = (dest?: TClose) => {
    setContent(undefined);
    setModalizeProps({});
    modalizeRef.current?.close(dest);
  };

  return (
    <>
      <BottomSheetContext.Provider
        value={{ showBottomSheet, dismissBottomSheet }}
      >
        {props.children}
      </BottomSheetContext.Provider>

      <Modalize ref={modalizeRef} {...modalizeProps}>
        {content}
      </Modalize>
    </>
  );
}
