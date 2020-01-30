var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.ts',
// <img src="picture.jpg">라는 코드를 Webpack은 <img src="/assets/picture.jpg">이렇게 바꿀것이다.
// 그래서 내 앱이 http://server.com/에서 돌아가고 있다면, 브라우저는 http://server.com/assets/picture.jpg파일을 읽어들일것이다.
// 이런 prefix의 기능을 활용해서 js / css / font파일이 cdn서버에서 가져와질 수 있도록 할 수 있다. 
// publicPath : "http://cdn.com/" 이렇게 해놓으면 파일들의 root path가 다 cdn.com으로 되서 저 서버에서 해당 파일들이 가져와질것이다.
  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        // ts-loader를 규칙에 추가하면 확장자가 
        // .ts일 경우 이 ts-loader를 거쳐서 처리를 하게 된다. appendTsSuffixTo 라는 옵션이 중요한데, 
        // 이 옵션을 사용하면 *.vue 파일도 마치 .ts 파일인 것 처럼 처리한다
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: __dirname + "/dist/",
    inline: true,
    hot: true,
    host: "localhost",
    port: 5500
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: 'index.html'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}