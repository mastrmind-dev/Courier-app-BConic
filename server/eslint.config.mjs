import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Handle all JS, MJS, CJS, TS files
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  // Handle JS files with CommonJS source type
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  // Define globals for the browser environment
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  // ESLint recommended config and Prettier config
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['node_modules', 'dist', 'build'] },
];
