import perfectionist from 'eslint-plugin-perfectionist';

const xoConfig = [
	{
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},
	{
		prettier: true,
		react: true,
		rules: {
			'react/react-in-jsx-scope': 'off',
			'sort-imports': [
				'error',
				{
					ignoreCase: false,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
					allowSeparatedGroups: false,
				},
			],
			'import-x/order': [
				'error',
				{
					groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
					pathGroups: [
						{
							pattern: 'react',
							group: 'builtin',
							position: 'before',
						},
						{
							pattern: '#*',
							group: 'parent',
							position: 'before',
						},
						{
							pattern: '*.css',
							patternOptions: {matchBase: true},
							group: 'index',
							position: 'after',
						},
					],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
					pathGroupsExcludedImportTypes: ['react'],
					warnOnUnassignedImports: true,
					'newlines-between': 'never',
				},
			],
			'react/jsx-sort-props': [
				'error',
				{
					callbacksLast: true,
					shorthandFirst: true,
					reservedFirst: true,
				},
			],
		},
	},
	{
		files: ['**/*.i18n.ts'],
		plugins: {perfectionist},
		rules: {
			'perfectionist/sort-object-types': 'error',
			'perfectionist/sort-objects': 'error',
			'perfectionist/sort-enums': 'error',
		},
	},
];

export default xoConfig;
