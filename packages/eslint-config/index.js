module.exports = {
  extends: [
    "plugin:react/recommended",// 使用eslint-plugin-react的推荐规则
    "plugin:@typescript-eslint/recommended", // 使用@typescript-eslint/eslint-plugin的推荐规则
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // 允许解析较新的ES特性
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // 允许解析JSX
    },
  },
  settings: {
    react: {
      version: "detect", // 告诉eslint-plugin-react自动检测要使用的React版本
    },
  },
  rules: {
    "import/extensions": 0,
    "no-use-before-define": "off",
    "no-console": ["error", { allow: ["warn", "error", "dir"] }],
    "no-debugger": "error",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    semi: ["error", "always"],
  },
};
