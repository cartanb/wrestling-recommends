module.exports = {
  entry: [
    './client/index.jsx',
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
  },
  watchOptions: {
    stdin: true,
  },
  mode: 'production',
};
