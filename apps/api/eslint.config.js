import js from "@eslint/js";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
        URL: "readonly"
      }
    },
    rules: {}
  }
];
