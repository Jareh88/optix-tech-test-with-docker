import path from "path";
import eslint from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import storybookPlugin from "eslint-plugin-storybook";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import eslintPluginImportX from "eslint-plugin-import-x";
import globals from "globals";

const myGlobals = {
  React: true,
  ...globals.browser,
  ...globals.es2021,
  ...globals.jest,
  ...globals.node,
};

export default tseslint.config(
  {
    ignores: [
      "dist",
      "build",
      "bin",
      "node_modules",
      "*.d.ts",
      "eslint.config.js",
    ],
  },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: myGlobals,
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: [path.join(path.resolve(), "tsconfig.json")],
        tsconfigRootDir: path.resolve(),
        EXPERIMENTAL_useProjectService: true,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
      storybook: storybookPlugin,
      "react-refresh": reactRefreshPlugin,
      "@typescript-eslint": tseslint.plugin,
      jest: jestPlugin,
      "import-x": eslintPluginImportX,
    },
    rules: {
      // React & React Hooks Rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      // Import rules
      ...eslintPluginImportX.flatConfigs.recommended.rules,
      ...eslintPluginImportX.flatConfigs.typescript.rules,
      // Prettier as a lint rule
      "prettier/prettier": "warn",
      // My custom rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // A possible choice for handling react-hook-form lib recommended onSubmit func, using void for now.
      // "@typescript-eslint/no-misused-promises": [
      //   "error",
      //   {
      //     checksVoidReturn: {
      //       attributes: false,
      //     },
      //   },
      // ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          paths: [path.resolve()],
        },
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
        },
      },
      "import-x/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  {
    files: ["**/vite.config.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  }
);
