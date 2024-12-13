const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const { log } = require('console');


// Function to get SCSS entries from src/styles/blocks directory
function blocksScssEntries() {
  const dir = './src/styles/blocks';
  const entries = {};
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isFile() && file.endsWith('.scss')) {
      entries[`src/styles/blocks/${file}`] = path.resolve(__dirname, filePath);
    }
  });
  return entries;
}

// Function to get JS and SCSS entries from acf-blocks directory
function acfBlocksEntries() {
  const dir = './acf-blocks';
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

const blocksScss = blocksScssEntries();
const acfBlocks = acfBlocksEntries();


module.exports = {
  watch: true,
  watchOptions: {
    ignored: '**/node_modules',
  },
  entry: {
    main: './src/scripts/main.js',
    style: './src/styles/main.scss',
    ...blocksScss,
    ...acfBlocks.js,
    ...acfBlocks.scss
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
      if (name === 'main') {
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
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"), // Use modern Dart Sass API
            },
          }
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
        if (name.startsWith('acf-blocks/') && name.endsWith('.scss')) {
          return name.replace('acf-blocks/', 'acf-blocks/').replace('.scss', '.css');
        }
        if (name.startsWith('src/styles/blocks/')) {
          return name.replace('src/styles/', 'assets/styles/').replace('.scss', '.css');
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
