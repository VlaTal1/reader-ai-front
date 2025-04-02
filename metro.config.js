// Learn more https://docs.expo.dev/guides/customizing-metro
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const {getDefaultConfig} = require("expo/metro-config");
// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import("expo/metro-config").MetroConfig} */

module.exports = (() => {
    const config = getDefaultConfig(process.cwd());

    const {transformer, resolver} = config;

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
    };
    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...resolver.sourceExts, "svg"],
    };

    return config;
})();
