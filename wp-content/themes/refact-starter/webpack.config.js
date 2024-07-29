const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');


function getBlockEntries(dir) {
  const entries = { js: {}, scss: {} };
  fs.readdirSync(dir).forEach(block => {
    const blockPath = path.join(dir, block);
    const scssPath = path.join(blockPath, 'index.scss');
    const jsPath = path.join(blockPath, 'index.js');
    if (fs.lstatSync(blockPath).isDirectory() && fs.existsSync(jsPath)) {
      entries.js[`acf-blocks/${block}/index.js`] = path.resolve(__dirname, jsPath);
    }
    if (fs.lstatSync(blockPath).isDirectory() && fs.existsSync(scssPath)) {
      entries.scss[`acf-blocks/${block}/index.scss`] = path.resolve(__dirname, scssPath);
    }
  });
  return entries;
}

const blockEntries = getBlockEntries('./acf-blocks');

module.exports = {
  watch: true,
  watchOptions: {
    ignored: '**/node_modules',
  },
  entry: {
    main: './src/scripts/main.js',
    style: './src/styles/main.scss',
    button: './src/styles/core/button.scss',
    ...blockEntries.js,
    ...blockEntries.scss
  },
  output: {
    filename: (pathData) => {
      const name = pathData.chunk?.name;
      if (!name) {
        throw new Error('Chunk name is undefined');
      }
      if (name.startsWith('acf-blocks/') && name.endsWith('.js')) {
        return name.replace('acf-blocks/', 'acf-blocks/').replace('index.js', 'index.min.js');
      }
      if(name === 'main') {
        return 'assets/scripts/[name].js';
      }
      return 'assets/scripts/[name].js'; 
    },
    path: path.resolve(__dirname, '.'),
    publicPath: '/'
  },  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', {}]
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new ESLintPlugin({
      extensions: ['js'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.js')
    }),
    new StylelintPlugin({
      configFile: path.resolve(__dirname, 'stylelint.config.js'),
      context: __dirname,
      files: ['src/styles/**/*.scss', 'acf-blocks/**/*.scss'],
    }), 
    new MiniCssExtractPlugin({
      filename: (pathData) => {
        const name = pathData.chunk?.name;
        if (!name) {
          throw new Error('Chunk name is undefined');
        }
        if (name === 'style') {
          return 'assets/styles/[name].css';
        }
        if (name === 'button') {
          return 'assets/styles/[name].css';
        }
        if (name.startsWith('acf-blocks/') && name.endsWith('.scss')) {
          return name.replace('acf-blocks/', 'acf-blocks/').replace('.scss', '.css');
        }
        return 'assets/styles/[name].css'; // Default case to handle unexpected names
      }
    }), 
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'assets'),
    },
    compress: true,
    port: 3000,
    hot: true,
    watchFiles: ['src/**/*', 'acf-blocks/**/*', 'templates/**/*', 'index.php']
  }
};
