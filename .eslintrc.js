module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
        "react-hooks",
        "jsx-a11y",
        "import",
        "@typescript-eslint",
        "unused-imports",
    ],
    rules: {
        // Possible Errors
        "no-console": "warn",
        "no-debugger": "error",
        "no-extra-boolean-cast": "warn",
        "no-irregular-whitespace": "error",

        // Best Practices
        "eqeqeq": ["error", "always"],
        "no-else-return": "error",
        "no-empty-function": "warn",
        "no-multi-spaces": "error",
        "curly": ["error", "all"],

        // Variables
        "no-unused-vars": "warn",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_"},
        ],

        // Import Rules
        "import/order": [
            "error",
            {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
                "newlines-between": "always",
            },
        ],
        "import/newline-after-import": "error",
        "import/no-default-export": "off",
        "import/namespace": "off",

        // React Specific
        "react/prop-types": "off", // If you use TypeScript for types
        "react/display-name": "off",
        "react/jsx-boolean-value": ["error", "always"],
        "react/jsx-curly-brace-presence": ["error", {props: "never", children: "ignore"}],
        "react/self-closing-comp": "error",
        "react/jsx-no-useless-fragment": "warn",
        "react/no-array-index-key": "warn",

        // Hooks
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        // JSX Accessibilityf
        "jsx-a11y/anchor-is-valid": "warn",
        "jsx-a11y/alt-text": "error",

        // Enforce double quotes in JSX
        "jsx-quotes": ["error", "prefer-double"],
        "quotes": ["error", "double", {"avoidEscape": true}],

        "comma-dangle": ["error", "always-multiline"],
    },
    ignorePatterns: ["node_modules/"],
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            alias: {
                map: [
                    ["@", "."],
                    ["@tamagui", "./node_modules/@tamagui"],
                ],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
};
