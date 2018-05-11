const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const StylishWebpackPlugin = require('webpack-stylish');

const ProvidePlugin = webpack.ProvidePlugin;
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// const ModuleConcatenationPlugin = webpack.optimize.ModuleConcatenationPlugin;
const ModuleConcatenationPlugin = null;

const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssConditionals = require('postcss-conditionals');
const autoprefixer = require('autoprefixer');

const isProduction = process.env.NODE_ENV === 'production';

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      postcssImport({
        path: [resolve('src/'), resolve('node_modules/')],
      }),
      // Putting this before mixins because need to resolve vars
      // before mixins are resolved. May cause syntax issues
      // with mixins $name args syntax
      postcssSimpleVars(),
      postcssConditionals(),
      postcssMixins({}),
      autoprefixer({}),
    ],
  },
};

const cssLoader = [
  {
    loader: 'css-loader',
    options: {
      import: false,
      minimize: isProduction,
    },
  },
  postcssLoader,
];

const cssModulesLoader = [
  '@nekr/css-components/loader',
  {
    loader: 'css-loader',
    options: {
      import: false,
      minimize: isProduction,
      modules: true,
      localIdentName: '[folder]_[local]-[hash:base64:5]',
      camelCase: false,
      // url: false
    },
  },
  postcssLoader,
];

const { resolve, join } = require('path');

const APP_DIST_FOLDER = resolve('dist');
const APP_SRC_FOLDER = resolve('src');

module.exports = function(env = {}) {
  const plugins = [];

  if (isProduction) {
    plugins.push(new UglifyJsPlugin(minifyConfig));
  }

  if (env.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    entry: {
      main: resolve(APP_SRC_FOLDER, 'main.js'),
    },
    output: {
      path: resolve(APP_DIST_FOLDER),
      filename: '[name].js',
      chunkFilename: 'chunks/[name].js',
      publicPath: '/',
    },

    module: {
      rules: [
        /*{
          test: /\.jsx?$/,
          loader: 'strip-sourcemap-loader'
        },*/

        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /node_modules/,
          options: {
            cacheDirectory: true,
          },
        },

        {
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                import: false,
                minimize: isProduction,
              },
            },
          ],
          test: /\.css$/,
          exclude: [APP_SRC_FOLDER],
        },

        {
          test: /\.css$/,
          oneOf: [
            {
              resourceQuery: /global/, // foo.css?global
              use: ['style-loader'].concat(cssLoader),
            },
            {
              include: [APP_SRC_FOLDER],
              use: ['style-loader'].concat(cssModulesLoader),
            }
          ],
        },

        {
          test: /\.(jpe?g|png|gif|woff2?|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/[hash].[ext]',
              },
            },
          ],
        },

        {
          test: /\.(jpe?g|png|gif|svg)$/,
          resourceQuery: /inline/, // foo.svg?inline
          use: 'url-loader',
        },

        {
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /file/, // foo.svg?file
              use: 'file-loader',
            },
            {
              exclude: [resolve(APP_SRC_FOLDER)],
              use: 'file-loader',
            },
            {
              use: 'svg-react-loader',
              issuer: /\.js$/,
              include: [resolve(APP_SRC_FOLDER)],
            },

            {
              use: {
                loader: 'svg-url-loader',
                options: {
                  stripdeclarations: true,
                },
              },
              issuer: /\.css$/,
              include: [resolve(APP_SRC_FOLDER)],
            },
          ]
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin([APP_DIST_FOLDER]),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: false,
        minify: isProduction ? minifyHTMLConfig : false,
      }),
      new ProvidePlugin({
        jsx: ['react', 'createElement'],
        React: ['react'],
        Component: ['react', 'Component'],
      }),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
      new webpack.NamedModulesPlugin(),
      new StylishWebpackPlugin(),
    ]
    .concat(plugins)
    .concat(ModuleConcatenationPlugin ? new ModuleConcatenationPlugin() : []),

    resolve: {
      modules: [resolve(APP_SRC_FOLDER), resolve('node_modules')],
      extensions: ['.js', '.jsx'],
      alias: {},
    },

    node: {
      console: false,
      global: true,
      process: false,
      __filename: "mock",
      __dirname: "mock",
      Buffer: false,
      setImmediate: false
    },
    stats: 'none',
    // mode: 'none'
  };
};

const minifyConfig = {
  compress: {
    warnings: false,
    dead_code: true,
    drop_console: true,
    unused: true,
  },

  output: {
    comments: false,
  },
};

const minifyHTMLConfig = {
  removeComments: true,
  removeCommentsFromCDATA: true,
  removeCDATASectionsFromCDATA: true,
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  minifyJS: minifyConfig,
  minifyCSS: {},
};
