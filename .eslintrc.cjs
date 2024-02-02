/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: ["prettier", "airbnb"],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 27,
    },
    "import/resolver": {
      typescript: {
        directory: "./tsconfig.json",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "jsx-a11y", "no-only-tests"],
  ignorePatterns: [
    "server/index.js",
    "build/index.js",
    "cypress.config.ts",
    ".eslintrc.js",
    "remix.config.js",
    "tailwind.config.js",
    "vitest.config.ts",
    "public",
    "logs",
    "setup-test-env.ts",
  ],
  rules: {
    indent: 0,
    "valid-jsdoc": "error",
    "no-prototype-builtins": 0,
    "no-warning-comments": "warn",
    "no-var": "error",
    "no-unused-vars": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 0,
    "@typescript-eslint/no-unused-vars": "error",
    "react/prop-types": 0,
    "no-import-assign": 0,
    "no-only-tests/no-only-tests": "warn",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        aspects: ["invalidHref"],
      },
    ],
    quotes: 0,
    "max-len": 0, // Handled by prettier
    "operator-linebreak": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/react-in-jsx-scope": 0,
    "react/function-component-definition": 0,
    "react/require-default-props": 0,
    "react/jsx-one-expression-per-line": 0,
    "implicit-arrow-linebreak": 0,
    "function-paren-newline": 0,
    "object-curly-newline": 0, // Handled by prettier
    "comma-dangle": 0, // Handled by prettier
    "import/no-unresolved": "error",
    "nonblock-statement-body-position": 0, // Handled by prettier
    curly: 0, // Handled by prettier
  },
  overrides: [
    {
      parser: "@typescript-eslint/parser",
      files: ["*.ts", "*.tsx"],
      extends: ["airbnb-typescript"],
      rules: {
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/indent": 0, // Handled by prettier
        "@typescript-eslint/quotes": 0,
        "@typescript-eslint/no-explicit-any": 1,
        "@typescript-eslint/comma-dangle": 0,
        "@typescript-eslint/explicit-function-return-type": 1,
        "@typescript-eslint/no-non-null-assertion": 1,
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/ban-ts-comment": 0,
        "comma-dangle": 0, // Handled by prettier
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      },
    },
    {
      parser: "@typescript-eslint/parser",
      files: ["*.ts"],
      rules: {
        "import/prefer-default-export": 0,
        "class-methods-use-this": 0,
      },
    },
  ],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
};
