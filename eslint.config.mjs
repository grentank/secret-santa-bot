import globals from 'globals';
import pluginJs from '@eslint/js';
import elbrusConfig from '@elbrus/eslint-config';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  ...elbrusConfig,
  {
    rules: {
      'no-console': 'off',
      'class-methods-use-this': 'warn',
      'consistent-return': 'warn',
      'no-continue': 'off',
    },
  },
];
