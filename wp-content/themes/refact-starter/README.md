# Refact Starter Theme

## Overview

Refact Starter Theme is a WordPress Full Site Editing (FSE) theme designed for rapid development with modern tools and standards. This guide will help you set up and use the theme, including various configurations and scripts provided in the project.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Linting](#linting)
- [Versioning](#versioning)
- [Gutenberg Blocks](#gutenberg-blocks)
- [File Descriptions](#file-descriptions)
  - [webpack.config.js](#webpackconfigjs)
  - [webpack.blocks.config.js](#webpackblocksconfigjs)
  - [composer.json](#composerjson)
  - [eslint.config.mjs](#eslintconfigmjs)
  - [stylelint.config.js](#stylelintconfigjs)
  - [phpcs.xml](#phpcsxml)
  - [package.json](#packagejson)
  - [update-version.js](#update-versionjs)
  - [theme.json](#themejson)
- [Contributing](#contributing)

## Features

- **Modern Development Workflow**: Utilizes Webpack for asset bundling, Babel for JavaScript transpilation, and Sass for CSS preprocessing.
- **Full Site Editing Support**: Compatible with WordPress FSE, allowing block-based theme development.
- **Automated Code Quality Tools**: Includes configurations for ESLint, Stylelint, and PHP CodeSniffer to maintain high code quality.
- **Versioning Script**: Automatically updates version numbers in block JSON and PHP asset files when SCSS files are modified.
- **Customizable Configuration**: Easily extend and override configurations for Webpack, ESLint, Stylelint, and PHP CodeSniffer.
- **Predefined Theme Settings**: Pre-configured theme.json file with customizable global styles and settings for color palettes, typography, spacing, and more.

## Getting Started

1. **Clone the repository:**
  ```sh
   git clone https://github.com/refactco/Refact-Starter.git
   cd Refact-Starter
   ```

2. **Install dependencies:**
  ```sh
   npm install
   composer install
  ```

## Running the Project


To start the project use the following command:
```sh
npm run start
```
### Linting

To lint JavaScript files:
```sh
npm run lint
```
To lint CSS/SASS files:
```sh
npm run lint:css
```
To check PHP code standards:
```sh
npm run phpcs
```
To automatically fix PHP code standard issues:
```sh
npm run phpcbf
```
### Versioning

The `update-version.js` script checks for modifications in SCSS files and updates version numbers in related JSON and PHP files. Run the script manually if needed:
```sh
npm run updateVersion
```
## Gutenberg Blocks
We have another webpack configuration for building Gutenberg blocks, which is located in `webpack.blocks.config.js`. if you want to start developing or building blocks you can use the following commands.

To start developing blocks:
```sh
npm run start:blocks
```
To start buillding blocks:
```sh
npm run build:blocks
```


## File Descriptions

### webpack.config.js

Main Webpack configuration file for bundling JavaScript and CSS.
- Defines entry points, output configuration, and module rules.
- Uses plugins like MiniCssExtractPlugin, ESLintPlugin, and StylelintPlugin.

### webpack.blocks.config.js

Extends the default Webpack configuration provided by `@wordpress/scripts`.
- Used to add or override configuration options specific to your project.

### composer.json

Contains PHP dependencies and configuration for PHP CodeSniffer.
- **require-dev**: Lists development dependencies such as PHP CodeSniffer and WordPress Coding Standards.
- **config**: Allows specific plugins to be used.

### eslint.config.mjs

Configuration for ESLint, specifying global variables and recommended rules.
- **languageOptions**: Defines global variables for the browser.
- **jsConfigs.recommended**: Includes recommended ESLint configurations.

### stylelint.config.js

Configuration for Stylelint, enforcing CSS/SASS coding standards.
- Extends the recommended configuration.
- Defines custom rules, such as BEM naming conventions and ignoring certain at-rules.

### phpcs.xml

Defines PHP CodeSniffer rules and file exclusions.
- Includes WordPress-specific rules.
- Excludes non-PHP files and certain directories.

### package.json

Lists Node.js dependencies and defines scripts for various tasks.
- **scripts**: Contains commands for building, linting, and running the project.
- **devDependencies** and **dependencies**: Lists required packages for development and production.


### update-version.js

Script to automatically update version numbers in block JSON and PHP asset files when SCSS files are modified.
- Checks modification times of files.
- Updates version numbers in corresponding JSON and PHP files.

### theme.json

Defines global styles and settings for the WordPress theme.
- Specifies color palettes, typography, spacing, and other settings.
- Defines template parts and custom templates.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or issues, please open an issue or a pull request on GitHub.

**To contribute:**
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Ensure your changes follow the coding standards and pass all tests.
5. Commit your changes with a descriptive commit message.
6. Push your branch to your forked repository.
7. Open a pull request on the main repository.

Thank you for contributing to Refact Starter Theme!