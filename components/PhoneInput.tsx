import {
  TextInput as Text,
  Image,
  View,
  StyleSheet,
  TextInput as defaultText,
} from "react-native";
import React, { PropsWithChildren, useState, useEffect } from "react";
import { formatNumber, getPhoneCode, CountryCode } from "libphonenumber-js";
import { TextInput } from "./UIKit";
import {  TextInputProps} from "./UIKit/Input";

declare type Props = TextInputProps & {
  onValueChange?: (value: string) => any;
  countryCode: CountryCode;
};

const PhoneInput: React.ForwardRefRenderFunction<defaultText | null, Props> = (
  props,
  ref
) => {
  const { onValueChange, countryCode, ...otherProps } = props;
  const [phoneNumber, setPhoneNumber] = useState("");
  const code = getPhoneCode(props.countryCode);
  const regex = new RegExp(`[^\\+${code}]`);

  useEffect(() => {
    let tempPhone = phoneNumber.replace(/\+/g, "00");
    let removeSpaces = tempPhone.replace(/ /g, "");

    if (props.onValueChange) props.onValueChange(removeSpaces);

    return () => {};
  }, [phoneNumber, props.onValueChange]);

  const onBlur = () => {
    const formattedNumber = phoneNumber.startsWith(`+${code}`)
      ? phoneNumber
      : formatNumber(
          `+${code}${phoneNumber.replace(regex, "")}`,
          "International"
        );

    setPhoneNumber(formattedNumber);
  };

  return (
    <TextInput
      {...otherProps}
      ref={ref}
      onBlur={onBlur}
      onChangeText={setPhoneNumber}
      value={phoneNumber}
      keyboardType={"phone-pad"}
      end={
        <Image
          source={{
            uri: `https://www.countryflags.io/${props.countryCode}/flat/64.png`,
          }}
          style={styles.icon}
        />
      }
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    position: "absolute",
    end: 16,
  },
});

export default React.forwardRef(PhoneInput);
