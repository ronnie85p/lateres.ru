const path = require("path");
const webpackConfig = require("../../webpack.config");

module.exports = (env, argv) => {
  const options = {
    entry: {
      build: __dirname + "/src/js/index.js",
    },

    outputPath: __dirname + "/dist", //path.resolve(__dirname, 'dist')
  };

  return webpackConfig(env, argv, options);
};
