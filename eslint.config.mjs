import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  globalIgnores([
    '.react-router/**',
    'build/**',
    '.source/**',
  ]),
]);

export default eslintConfig;
