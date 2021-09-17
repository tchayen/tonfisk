const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();
const withTM = require("next-transpile-modules")(["ds"]);

module.exports = () => {
  const plugins = [withVanillaExtract, withTM];
  return plugins.reduce((acc, next) => next(acc), {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }
      return config;
    },
  });
};
