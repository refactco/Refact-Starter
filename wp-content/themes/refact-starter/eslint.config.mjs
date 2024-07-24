import pkg from '@eslint/js';
import globals from 'globals';

const { configs: jsConfigs } = pkg;

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  jsConfigs.recommended,
];
