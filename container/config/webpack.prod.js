const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketingModule: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        authModule: `auth@${domain}/auth/latest/remoteEntry.js`,
        dashboardModule: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
      //   shared: ['react', 'react-dom'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/sitemap.xml', to: 'sitemap.xml' },
        { from: 'public/robots.txt', to: 'robots.txt' },
      ],
    }),
  ],
};
module.exports = merge(commonConfig, prodConfig);