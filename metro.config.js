const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.alias = {
  '@': './',
};
module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), { input: "./global.css" });
