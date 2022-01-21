import React from "react";
import { HomeUIProps } from "./home.type";
import { Button, Link, RippleButton, Text } from "@app/components/UIKit";
import ContentView from "@app/components/ContentView";
import { useAlert, useBottomSheet, useConfirm } from "@app/hooks";
import Ionicons from "@app/components/Ionicons";
import Input from "@app/components/UIKit/Input";

export const HomeUI = ({ styles }: HomeUIProps) => {
  const { showBottomSheet, dismissBottomSheet } = useBottomSheet();
  const { showAlert, hideAlert } = useAlert();
  const { showConfirm, hideConfirm } = useConfirm();
  return (
    <ContentView contentStyle={styles.container}>
      <Link to="/detail">Detail</Link>

      <Button
        title="Show Dialog"
        onPress={
          () => showConfirm({ title: "hello" })
          // showBottomSheet(
          //   <Ionicons
          //     name="home"
          //     size={30}
          //     color="white"
          //     onPress={dismissBottomSheet}
          //   />
          // )
        }
      ></Button>

      <RippleButton
        style={{
          width: 200,
          height: 200,
          backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Hello</Text>
      </RippleButton>
    </ContentView>
  );
};
