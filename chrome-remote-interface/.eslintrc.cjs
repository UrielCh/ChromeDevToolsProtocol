module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "comma-spacing": ["error"],
    eqeqeq: ["error", "always"],
    indent: ["error", 2],
    "key-spacing": ["error"],
    "keyword-spacing": ["error"],
    "no-multi-spaces": ["error"],
    "no-unused-vars": ["error", {
      "args": "none",
    }],
    "no-var": ["error"],
    "no-console": ["off"],
    "prefer-const": ["error"],
    "prefer-arrow-callback": ["error"],
    quotes: ["error", "double", { "avoidEscape": true }],
    semi: ["error"],
    strict: ["error", "global"],
    "space-before-blocks": ["error"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
    }],
  },
};
