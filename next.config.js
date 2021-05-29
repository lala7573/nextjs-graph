const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  future: {
    webpack5: true,
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  }
}
