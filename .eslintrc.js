module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:eslint-comments/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  ignorePatterns: ['node_modules/**', 'dist/**', 'coverage/**'],
  plugins: ['import', '@typescript-eslint', 'prettier', 'jest'],
  rules: {
    'no-param-reassign': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'no-plusplus': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'guard-for-in': 'off',
    'linebreak-style': ['error', 'unix'],
    // 'no-console': ['warn', { allow: ['error'] }],
    'no-return-assign': 'error',
    'no-void': 'error',
    'no-debugger': 'error',
    'arrow-body-style': 'off',
    'prefer-destructuring': 'off',
    'max-classes-per-file': 'off',
    'newline-before-return': 'off',
    'prefer-template': 'off',
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator='in']"],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'lf',
      },
      {
        usePrettierrc: false,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': [2, { ignore: ['swagger.json'] }],
    'no-useless-catch': 'error',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-await-in-loop': 'off',
    'no-shadow': 'off',
    'no-prototype-builtins': 'off',
    'eslint-comments/no-unused-disable': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_', destructuredArrayIgnorePattern: '_' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/naming-convention': [
          'off',
          {
            selector: 'default',
            format: ['camelCase'],
          },
          {
            selector: 'memberLike',
            format: ['camelCase', 'UPPER_CASE', 'snake_case'],
          },
          {
            selector: 'enumMember',
            format: ['PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'property',
            format: ['camelCase', 'UPPER_CASE', 'snake_case'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: 'variable',
            filter: {
              regex: '^Api|^Use|Enum$|Protect$',
              match: true,
            },
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'function',
            filter: {
              regex: '^Is|^Use|Dto$|Factory$',
              match: true,
            },
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: ['parameter'],
            format: null,
            filter: {
              regex: '^_',
              match: true,
            },
          },
        ],
      },
    },
    {
      files: ['**/*.spec.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/all'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'off',
        'jest/no-hooks': 'off',
        'jest/prefer-lowercase-title': 'off',
        'jest/prefer-expect-assertions': 'off',
        'jest/no-truthy-falsy': 'off',
        'jest/no-restricted-matchers': [
          'error',
          {
            toBeTruthy: 'Avoid `toBeTruthy`',
            toBeFalsy: 'Avoid `toBeFalsy`',
          },
        ],
      },
    },
  ],
};
