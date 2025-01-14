import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:import/recommended",
		"next/core-web-vitals",
		"next/typescript",
		"prettier",
	),
	{
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRoot: __dirname,
			},
		},
		rules: {
			// sort imports
			"import/order": [
				"error",
				{
					"newlines-between": "always",
					alphabetize: {
						order: "asc",
						orderImportKind: "asc",
					},
					groups: ["builtin", "external", "index", "internal", "sibling", "parent", "object", "type"],
				},
			],

			// no let exports
			"import/no-mutable-exports": "error",

			"import/no-cycle": "error",
			"import/no-default-export": "error",

			// allow {} even though it's unsafe but comes handy
			// @typescript-eslint/ban-types is deprecated
			"@typescript-eslint/no-restricted-types": [
				"error",
				{
					types: {
						"{}": {
							message: "it's unsafe but comes handy",
						},
					},
				},
			],

			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					prefer: "type-imports",
					fixStyle: "inline-type-imports",
					disallowTypeAnnotations: false,
				},
			],

			"import/no-duplicates": ["error", { "prefer-inline": true }],

			// false negatives
			"import/namespace": ["off"],

			// we allow empty interfaces
			"no-empty-pattern": "off",
			"@typescript-eslint/no-empty-interface": "off",

			// we allow empty functions
			"@typescript-eslint/no-empty-function": "off",

			// we sometimes use async functions that don't await anything
			"@typescript-eslint/require-await": "off",

			// make sure to `await` inside try…catch
			"@typescript-eslint/return-await": ["error", "in-try-catch"],

			// allow unused vars prefixed with `_`
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],

			// numbers and booleans are fine in template strings
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{ allowNumber: true, allowBoolean: true },
			],

			"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],

			"no-restricted-imports": [
				"error",
				{
					name: "next/router",
					message: "Please use next/navigation instead.",
				},
			],
		},
	},
	{
		files: ["src/app/**/{page,layout,loading,route}.ts?(x)", "tailwind.config.ts"],
		rules: {
			"import/no-default-export": "off",
		},
	},
	{
		ignores: ["*.js", "*.jsx", "*.config.mjs"],
	},
];

export default eslintConfig;
