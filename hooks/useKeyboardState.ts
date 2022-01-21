import { useEffect, useState } from "react";
import { Keyboard, LayoutAnimation, Platform } from "react-native";

type Props = {
  enableLayoutAnimation?: boolean;
};

export default function useKeyboardState(props?: Props) {
  const enableLayoutAnimation =
    props?.enableLayoutAnimation != undefined
      ? props.enableLayoutAnimation
      : true;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ ios: "keyboardWillShow", default: "keyboardDidShow" }),
      (e) => {
        const keyboardHeight = e.endCoordinates.height;
        if (enableLayoutAnimation)
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardHeight(keyboardHeight);
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ ios: "keyboardWillHide", default: "keyboardDidHide" }),
      () => {
        if (enableLayoutAnimation)
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardHeight(0);
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {
    isKeyboardVisible: keyboardVisible,
    keyboardHeight,
  };
}
