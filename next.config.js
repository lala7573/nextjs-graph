
module.exports = {
  future: {
    webpack5: true,
  },
  env: {
    APP_ENV: process.env.APP_ENV,
  },
  trailingSlash: true,
  basePath: '/nextjs-graph',
  webpack: (config, options) => {
    // config.basePath = prefix;
    // if (config.resolve.plugins) {
    //   config.resolve.plugins.push(new TsconfigPathsPlugin());
    // } else {
    //   config.resolve.plugins = [new TsconfigPathsPlugin()];
    // }

    return config;
  }
}
