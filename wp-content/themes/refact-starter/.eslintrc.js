module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'script',
  },
  rules: {
    "no-console": "off", // Allow console.log for debugging
    "prefer-arrow-callback": "error", // Enforce arrow functions for callbacks
    "func-names": "off", // Disable requiring function names
    "strict": ["error", "global"], // Enforce strict mode globally
  },
  globals: {
    document: 'readonly',
    console: 'readonly'
  }
};
