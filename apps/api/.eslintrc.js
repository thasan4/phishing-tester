module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'airbnb-typescript',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.ts']
      }
    }
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'new-cap': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'enum',
        'format': ['PascalCase'],
        'suffix': ['Enum']
      },
    ],
    'max-classes-per-file': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-cycle': 'off',
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-continue': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
  },

  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': [
          'warn',
          {
            accessibility: 'explicit',
            overrides: {
              accessors: 'off',
              constructors: 'no-public',
              methods: 'explicit',
              properties: 'explicit',
              parameterProperties: 'explicit',
            },
          },
        ],
      },
    },
  ],
};
