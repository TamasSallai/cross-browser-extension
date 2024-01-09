const path = require('path')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
  const manifestFile =
    env.browser === 'edge' ||
    env.browser === 'opera' ||
    env.browser === 'chrome'
      ? 'chromium'
      : `${env.browser}`

  return {
    entry: {
      popup: path.resolve('src/popup.tsx'),
      content: path.resolve('src/content.ts'),
      background: path.resolve('src/background.ts'),
    },
    module: {
      rules: [
        {
          use: 'ts-loader',
          test: /\.tsx?$/,
          exclude: /node_modules/,
        },
        {
          use: ['style-loader', 'css-loader'],
          test: /\.css$/i,
        },
        {
          type: 'asset/resource',
          test: /\.(jpg|jpeg|png|svg)$/,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(`src/manifests/${manifestFile}.json`),
            to: path.resolve('dist/manifest.json'),
          },
          {
            from: path.resolve('src/static/icon.png'),
            to: path.resolve('dist'),
          },
        ],
      }),
      new HTMLPlugin({
        title: 'Cross Browser Extension',
        filename: 'popup.html',
        chunks: ['popup'],
      }),
      new DefinePlugin({
        'process.env.BROWSER': JSON.stringify(env.browser),
      }),
    ],
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  }
}
