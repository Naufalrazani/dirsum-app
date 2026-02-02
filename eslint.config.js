// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cypress from 'eslint-plugin-cypress';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  { ignores: ['dist', 'node_modules', 'vite.config.js', 'cypress.config.js'] },
  ...compat.extends('eslint-config-standard'),
  {
    files: ['**/*.{js,jsx}', 'cypress/**/*.cy.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        before: 'readonly',
        after: 'readonly',
        context: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      cypress
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'error',
      'no-console': 'warn',

      'jsx-a11y/label-has-associated-control': 'off',
      'cypress/no-unnecessary-waiting': 'warn',

      semi: ['error', 'always']
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  ...storybook.configs['flat/recommended']
];
