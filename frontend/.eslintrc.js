module.exports = {
	env: {
		jest: true,
	},
	extends: ["eslint-config-codely", "plugin:jsdoc/recommended-error", "plugin:cypress/recommended"],
	parser: "@typescript-eslint/parser",
	rules: {
		"jsdoc/require-param": "off",
		"jsdoc/check-param-names": "off",
		"jsdoc/require-jsdoc": "off",
		"eslint-disable-next-line no-console": "off",
		"no-console": "off",
	},
	globals: {
		JSX: "readonly",
	},
};
