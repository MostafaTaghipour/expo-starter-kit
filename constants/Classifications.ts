import { StyleProp, StyleSheet, ViewProps, ViewStyle } from "react-native";
import memoize from "lodash.memoize";
import Theme from "./Theme";

const shadowColor = "#000";

export const commonStyles = StyleSheet.create({
  /* #region  Flex */
  flex_1: {
    flex: 1,
  },
  flex_2: {
    flex: 2,
  },
  flex_3: {
    flex: 3,
  },
  flex_4: {
    flex: 4,
  },
  flex_0_5: {
    flex: 0.5,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flexDirection: "column",
  },
  /* #endregion */

  /* #region  Dimensions */
  full_width: {
    width: "100%",
  },
  full_height: {
    height: "100%",
  },
  /* #endregion */

  /* #region  Align Self */
  align_self_center: {
    alignSelf: "center",
  },
  align_self_start: {
    alignSelf: "flex-start",
  },
  align_self_end: {
    alignSelf: "flex-end",
  },
  /* #endregion */

  /* #region  Position */
  position_absolute: {
    position: "absolute",
  },
  position_relative: {
    position: "relative",
  },
  /* #endregion */

  /* #region  Justify Content */
  justify_content_center: {
    justifyContent: "center",
  },
  justify_content_start: {
    justifyContent: "flex-start",
  },
  justify_content_end: {
    justifyContent: "flex-end",
  },
  justify_content_space_between: {
    justifyContent: "space-between",
  },
  justify_content_space_around: {
    justifyContent: "space-around",
  },
  /* #endregion */

  /* #region  Align Items */
  align_items_center: {
    alignItems: "center",
  },
  align_items_end: {
    alignItems: "flex-end",
  },
  align_items_start: {
    alignItems: "flex-start",
  },
  /* #endregion */

  /* #region  Margin */
  margin_32: {
    margin: 32,
  },
  margin_vertical_32: {
    marginVertical: 32,
  },
  margin_horizontal_32: {
    marginHorizontal: 32,
  },
  margin_top_32: {
    marginTop: 32,
  },
  margin_bottom_32: {
    marginBottom: 32,
  },
  margin_start_32: {
    marginStart: 32,
  },
  margin_end_32: {
    marginEnd: 32,
  },
  margin_24: {
    margin: 24,
  },
  margin_vertical_24: {
    marginVertical: 24,
  },
  margin_horizontal_24: {
    marginHorizontal: 24,
  },
  margin_top_24: {
    marginTop: 24,
  },
  margin_bottom_24: {
    marginBottom: 24,
  },
  margin_start_24: {
    marginStart: 24,
  },
  margin_end_24: {
    marginEnd: 24,
  },
  margin_16: {
    margin: 16,
  },
  margin_vertical_16: {
    marginVertical: 16,
  },
  margin_horizontal_16: {
    marginHorizontal: 16,
  },
  margin_top_16: {
    marginTop: 16,
  },
  margin_bottom_16: {
    marginBottom: 16,
  },
  margin_start_16: {
    marginStart: 16,
  },
  margin_end_16: {
    marginEnd: 16,
  },
  margin_12: {
    margin: 12,
  },
  margin_vertical_12: {
    marginVertical: 12,
  },
  margin_horizontal_12: {
    marginHorizontal: 12,
  },
  margin_top_12: {
    marginTop: 12,
  },
  margin_bottom_12: {
    marginBottom: 12,
  },
  margin_start_12: {
    marginStart: 12,
  },
  margin_end_12: {
    marginEnd: 12,
  },
  margin_8: {
    margin: 8,
  },
  margin_vertical_8: {
    marginVertical: 8,
  },
  margin_horizontal_8: {
    marginHorizontal: 8,
  },
  margin_top_8: {
    marginTop: 8,
  },
  margin_bottom_8: {
    marginBottom: 8,
  },
  margin_start_8: {
    marginStart: 8,
  },
  margin_end_8: {
    marginEnd: 8,
  },
  margin_4: {
    margin: 4,
  },
  margin_vertical_4: {
    marginVertical: 4,
  },
  margin_horizontal_4: {
    marginHorizontal: 4,
  },
  margin_top_4: {
    marginTop: 4,
  },
  margin_bottom_4: {
    marginBottom: 4,
  },
  margin_start_4: {
    marginStart: 4,
  },
  margin_end_4: {
    marginEnd: 4,
  },
  margin_0: {
    margin: 0,
  },
  margin_vertical_0: {
    marginVertical: 0,
  },
  margin_horizontal_0: {
    marginHorizontal: 0,
  },
  margin_top_0: {
    marginTop: 0,
  },
  margin_bottom_0: {
    marginBottom: 0,
  },
  margin_start_0: {
    marginStart: 0,
  },
  margin_end_0: {
    marginEnd: 0,
  },
  /* #endregion */

  /* #region  Margin Negative */
  margin_ng_32: {
    margin: -32,
  },
  margin_ng_vertical_32: {
    marginVertical: -32,
  },
  margin_ng_horizontal_32: {
    marginHorizontal: -32,
  },
  margin_ng_top_32: {
    marginTop: -32,
  },
  margin_ng_bottom_32: {
    marginBottom: -32,
  },
  margin_ng_start_32: {
    marginStart: -32,
  },
  margin_ng_end_32: {
    marginEnd: -32,
  },
  margin_ng_24: {
    margin: -24,
  },
  margin_ng_vertical_24: {
    marginVertical: -24,
  },
  margin_ng_horizontal_24: {
    marginHorizontal: -24,
  },
  margin_ng_top_24: {
    marginTop: -24,
  },
  margin_ng_bottom_24: {
    marginBottom: -24,
  },
  margin_ng_start_24: {
    marginStart: -24,
  },
  margin_ng_end_24: {
    marginEnd: -24,
  },
  margin_ng_16: {
    margin: -16,
  },
  margin_ng_vertical_16: {
    marginVertical: -16,
  },
  margin_ng_horizontal_16: {
    marginHorizontal: -16,
  },
  margin_ng_top_16: {
    marginTop: -16,
  },
  margin_ng_bottom_16: {
    marginBottom: -16,
  },
  margin_ng_start_16: {
    marginStart: -16,
  },
  margin_ng_end_16: {
    marginEnd: -16,
  },
  margin_ng_12: {
    margin: -12,
  },
  margin_ng_vertical_12: {
    marginVertical: -12,
  },
  margin_ng_horizontal_12: {
    marginHorizontal: -12,
  },
  margin_ng_top_12: {
    marginTop: -12,
  },
  margin_ng_bottom_12: {
    marginBottom: -12,
  },
  margin_ng_start_12: {
    marginStart: -12,
  },
  margin_ng_end_12: {
    marginEnd: -12,
  },
  margin_ng_8: {
    margin: -8,
  },
  margin_ng_vertical_8: {
    marginVertical: -8,
  },
  margin_ng_horizontal_8: {
    marginHorizontal: -8,
  },
  margin_ng_top_8: {
    marginTop: -8,
  },
  margin_ng_bottom_8: {
    marginBottom: -8,
  },
  margin_ng_start_8: {
    marginStart: -8,
  },
  margin_ng_end_8: {
    marginEnd: -8,
  },
  margin_ng_4: {
    margin: -8,
  },
  margin_ng_vertical_4: {
    marginVertical: -8,
  },
  margin_ng_horizontal_4: {
    marginHorizontal: -8,
  },
  margin_ng_top_4: {
    marginTop: -8,
  },
  margin_ng_bottom_4: {
    marginBottom: -8,
  },
  margin_ng_start_4: {
    marginStart: -8,
  },
  margin_ng_end_4: {
    marginEnd: -8,
  },
  /* #endregion */

  /* #region  Padding */
  padding_32: {
    padding: 32,
  },
  padding_vertical_32: {
    paddingVertical: 32,
  },
  padding_horizontal_32: {
    paddingHorizontal: 32,
  },
  padding_top_32: {
    paddingTop: 32,
  },
  padding_bottom_32: {
    paddingBottom: 32,
  },
  padding_start_32: {
    paddingStart: 32,
  },
  padding_end_32: {
    paddingEnd: 32,
  },
  padding_24: {
    padding: 24,
  },
  padding_vertical_24: {
    paddingVertical: 24,
  },
  padding_horizontal_24: {
    paddingHorizontal: 24,
  },
  padding_top_24: {
    paddingTop: 24,
  },
  padding_bottom_24: {
    paddingBottom: 24,
  },
  padding_start_24: {
    paddingStart: 24,
  },
  padding_end_24: {
    paddingEnd: 24,
  },
  padding_16: {
    padding: 16,
  },
  padding_vertical_16: {
    paddingVertical: 16,
  },
  padding_horizontal_16: {
    paddingHorizontal: 16,
  },
  padding_top_16: {
    paddingTop: 16,
  },
  padding_bottom_16: {
    paddingBottom: 16,
  },
  padding_start_16: {
    paddingStart: 16,
  },
  padding_end_16: {
    paddingEnd: 16,
  },
  padding_12: {
    padding: 12,
  },
  padding_vertical_12: {
    paddingVertical: 12,
  },
  padding_horizontal_12: {
    paddingHorizontal: 12,
  },
  padding_top_12: {
    paddingTop: 12,
  },
  padding_bottom_12: {
    paddingBottom: 12,
  },
  padding_start_12: {
    paddingStart: 12,
  },
  padding_end_12: {
    paddingEnd: 12,
  },
  padding_8: {
    padding: 8,
  },
  padding_vertical_8: {
    paddingVertical: 8,
  },
  padding_horizontal_8: {
    paddingHorizontal: 8,
  },
  padding_top_8: {
    paddingTop: 8,
  },
  padding_bottom_8: {
    paddingBottom: 8,
  },
  padding_start_8: {
    paddingStart: 8,
  },
  padding_end_8: {
    paddingEnd: 8,
  },
  padding_4: {
    padding: 4,
  },
  padding_vertical_4: {
    paddingVertical: 4,
  },
  padding_horizontal_4: {
    paddingHorizontal: 4,
  },
  padding_top_4: {
    paddingTop: 4,
  },
  padding_bottom_4: {
    paddingBottom: 4,
  },
  padding_start_4: {
    paddingStart: 4,
  },
  padding_end_4: {
    paddingEnd: 4,
  },
  padding_0: {
    padding: 0,
  },
  padding_vertical_0: {
    paddingVertical: 0,
  },
  padding_horizontal_0: {
    paddingHorizontal: 0,
  },
  padding_top_0: {
    paddingTop: 0,
  },
  padding_bottom_0: {
    paddingBottom: 0,
  },
  padding_start_0: {
    paddingStart: 0,
  },
  padding_end_0: {
    paddingEnd: 0,
  },
  /* #endregion */

  /* #region  Margin Negative */
  padding_ng_32: {
    padding: -32,
  },
  padding_ng_vertical_32: {
    paddingVertical: -32,
  },
  padding_ng_horizontal_32: {
    paddingHorizontal: -32,
  },
  padding_ng_top_32: {
    paddingTop: -32,
  },
  padding_ng_bottom_32: {
    paddingBottom: -32,
  },
  padding_ng_start_32: {
    paddingStart: -32,
  },
  padding_ng_end_32: {
    paddingEnd: -32,
  },
  padding_ng_24: {
    padding: -24,
  },
  padding_ng_vertical_24: {
    paddingVertical: -24,
  },
  padding_ng_horizontal_24: {
    paddingHorizontal: -24,
  },
  padding_ng_top_24: {
    paddingTop: -24,
  },
  padding_ng_bottom_24: {
    paddingBottom: -24,
  },
  padding_ng_start_24: {
    paddingStart: -24,
  },
  padding_ng_end_24: {
    paddingEnd: -24,
  },
  padding_ng_16: {
    padding: -16,
  },
  padding_ng_vertical_16: {
    paddingVertical: -16,
  },
  padding_ng_horizontal_16: {
    paddingHorizontal: -16,
  },
  padding_ng_top_16: {
    paddingTop: -16,
  },
  padding_ng_bottom_16: {
    paddingBottom: -16,
  },
  padding_ng_start_16: {
    paddingStart: -16,
  },
  padding_ng_end_16: {
    paddingEnd: -16,
  },
  padding_ng_12: {
    padding: -12,
  },
  padding_ng_vertical_12: {
    paddingVertical: -12,
  },
  padding_ng_horizontal_12: {
    paddingHorizontal: -12,
  },
  padding_ng_top_12: {
    paddingTop: -12,
  },
  padding_ng_bottom_12: {
    paddingBottom: -12,
  },
  padding_ng_start_12: {
    paddingStart: -12,
  },
  padding_ng_end_12: {
    paddingEnd: -12,
  },
  padding_ng_8: {
    padding: -8,
  },
  padding_ng_vertical_8: {
    paddingVertical: -8,
  },
  padding_ng_horizontal_8: {
    paddingHorizontal: -8,
  },
  padding_ng_top_8: {
    paddingTop: -8,
  },
  padding_ng_bottom_8: {
    paddingBottom: -8,
  },
  padding_ng_start_8: {
    paddingStart: -8,
  },
  padding_ng_end_8: {
    paddingEnd: -8,
  },
  padding_ng_4: {
    padding: -8,
  },
  padding_ng_vertical_4: {
    paddingVertical: -8,
  },
  padding_ng_horizontal_4: {
    paddingHorizontal: -8,
  },
  padding_ng_top_4: {
    paddingTop: -8,
  },
  padding_ng_bottom_4: {
    paddingBottom: -8,
  },
  padding_ng_start_4: {
    paddingStart: -8,
  },
  padding_ng_end_4: {
    paddingEnd: -8,
  },
  /* #endregion */

  /* #region  Elevation */
  elevation_0: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
  },

  elevation_1: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  elevation_2: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  elevation_3: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  elevation_4: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  elevation_5: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  elevation_6: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  elevation_7: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },

  elevation_8: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  elevation_9: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },

  elevation_10: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  elevation_12: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },

  elevation_16: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },

  elevation_20: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },

  elevation_24: {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  /* #endregion */
});

export const elevationStyle = memoize(
  (
    elevation: number | undefined = undefined,
    colorOfShadow: string | undefined = undefined
  ) => {
    const color = colorOfShadow ? colorOfShadow : shadowColor;
    const x = elevation != undefined ? elevation : Theme.dark.elevation;

    let res: StyleProp<ViewStyle> = commonStyles.elevation_0;

    switch (true) {
      case x == 0:
        res = commonStyles.elevation_0;
        break;
      case x == 1:
        res = commonStyles.elevation_1;
        break;
      case x == 2:
        res = commonStyles.elevation_2;
        break;
      case x == 3:
        res = commonStyles.elevation_3;
        break;
      case x == 4:
        res = commonStyles.elevation_4;
        break;
      case x == 5:
        res = commonStyles.elevation_5;
        break;
      case x == 6:
        res = commonStyles.elevation_6;
        break;
      case x == 7:
        res = commonStyles.elevation_7;
        break;
      case x == 8:
        res = commonStyles.elevation_8;
        break;
      case x == 9:
        res = commonStyles.elevation_9;
        break;
      case x == 10:
        res = commonStyles.elevation_10;
        break;
      case x <= 12:
        res = commonStyles.elevation_12;
        break;
      case x <= 16:
        res = commonStyles.elevation_16;
        break;
      case x <= 20:
        res = commonStyles.elevation_20;
        break;
      case x <= 24:
        res = commonStyles.elevation_24;
        break;
      default:
        res = commonStyles.elevation_0;
        break;
    }

    StyleSheet.compose(res, { shadowColor: color });

    return res;
  }
);
