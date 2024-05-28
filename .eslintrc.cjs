module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended"
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"object-shorthand": 0,
		semi: [2, "always"],
		indent: [0, 4],
		"space-before-function-paren": [
			"error",
			{ anonymous: "always", named: "never" }
		],
		"multiline-ternary": ["off"],
		quotes: [
			"error",
			"double",
			{
				allowTemplateLiterals: true,
				avoidEscape: true
			}
		]
	}
};
