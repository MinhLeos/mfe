const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    },
    // historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketingModule: 'marketing@http://localhost:8081/remoteEntry.js',
        authModule: 'auth@http://localhost:8082/remoteEntry.js',
      },
      shared: packageJson.dependencies,
      //   shared: ['react', 'react-dom'],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
