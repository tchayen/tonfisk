const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();
const withTM = require("next-transpile-modules")(["tonfisk"]);
const webpack = require("webpack");

module.exports = () => {
  const plugins = [withVanillaExtract, withTM];
  return plugins.reduce((acc, next) => next(acc), {
    webpack: (config, { buildId, isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
        config.plugins.push(
          new webpack.DefinePlugin({
            "process.env.CONFIG_BUILD_ID": JSON.stringify(buildId),
          })
        );
      }

      return config;
    },
  });
};
