import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface DevServerConfiguration extends WebpackDevServerConfiguration {
  static: Record<'directory', string>;
}
interface Configuration extends WebpackConfiguration {
  devServer?: DevServerConfiguration;
}

const config: Configuration = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  loader: {
    test: /\.scss$/,
    include: path .join(__dirname, "src"),
    loaders: ["style", "css", "sass"]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build")
    },
    compress: true,
    port: 9000,
  },
};

export default config; 