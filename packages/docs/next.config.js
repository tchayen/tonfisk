const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();
const withTM = require("next-transpile-modules")(["tonfisk"]);

module.exports = () => {
  const plugins = [withVanillaExtract, withTM];
  return plugins.reduce((acc, next) => next(acc), {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;

        // This will make Next.js run script on deploy.
        require("../social/script");
      }

      return config;
    },
  });
};
