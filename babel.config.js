// @generated: @expo/next-adapter@2.1.39
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#shared-steps

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["@expo/next-adapter/babel"],
    plugins: [
      // "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@app": "./",
          },
        },
      ],
    ],
  };
};
