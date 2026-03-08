const path = require("path") // Importa path
const HtmlWebpackPlugin = require("html-webpack-plugin") // importa  html webpack plugin
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  target: "web",
  mode: "development",

  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    port: 3000,
    open: true, // Sempre que executar o dev server abrir a aplicação 
    liveReload: true, // Recarrega sempre que modificar
  },

  plugins: [
    // Carregando o HTML no webpack/dist
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      favicon: path.resolve("src", "assets", "scissors.svg")
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"),
          to: path.resolve(__dirname, "dist", "src", "assets")
        },
      ],
    })
  ],

  module: {
    rules: [
      {
        // settando para quando for arquivo css usar sempre style-loader e css-loader
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/, // Test com RegEx que termina com .js
        exclude: /node_modules/, // Excluindo pasta node_modules
        use: { // Depois de encontrar o padrao/regra ( do test js ) vai usar:
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
}