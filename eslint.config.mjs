// @ts-check

import eslintConfig from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

const config = defineConfig(
  ...nextVitals,
  ...nextTs,
  eslintConfig.configs.recommended,
  eslintConfigPrettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'next-env.d.ts']),
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: '19.2',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'unknown',
            'object',
          ],
          'newlines-between': 'always',
          pathGroups: [
            { pattern: '@app/**', group: 'internal' },
            { pattern: '@api/**', group: 'internal' },
            { pattern: '@components/**', group: 'internal' },
            { pattern: '@hooks/**', group: 'internal' },
            { pattern: '@lib/**', group: 'internal' },
            { pattern: '@store/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },
  {
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
    },
  },
  {
    files: ['**/*.test.*'],
    plugins: { vitest },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  }
);

export default config;
