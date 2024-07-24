module.exports = {
  extends: "stylelint-config-recommended",
  rules: {
    "font-family-no-duplicate-names": true,
    "selector-class-pattern": [
      "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",
      {
        "message": "Expected BEM naming convention for class."
      }
    ],
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["function", "if", "each", "include", "mixin"]
    }],
    "no-descending-specificity": null,
  }
};
