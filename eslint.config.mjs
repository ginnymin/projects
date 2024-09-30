// @ts-check

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfig from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
// @ts-expect-error eslint-plugin-jest does not have a declaration file
import eslintPluginJest from 'eslint-plugin-jest';
import typescriptEslint from 'typescript-eslint';

const compat = new FlatCompat();

export default typescriptEslint.config(
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  eslintConfig.configs.recommended,
  ...typescriptEslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    ignores: ['.next', 'build'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
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
            { pattern: '@store/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  {
    files: ['**/*.test.*'],
    ...eslintPluginJest.configs['flat/recommended'], // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    rules: {
      ...eslintPluginJest.configs['flat/recommended'].rules, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
      '@typescript-eslint/unbound-method': 'off',
      'jest/unbound-method': 'error',
    },
  },
  {
    files: ['**/scripts/instagram.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  }
);
