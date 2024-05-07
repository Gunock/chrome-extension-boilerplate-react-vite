// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist']
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        ...reactRecommended,
        ...reactJsxRuntime,
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        settings: {
            version: 'detect'
        }
    },
    {
        plugins: {
            'simple-import-sort': simpleImportSort
        },
        rules: {
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn'
        }
    },
    eslintConfigPrettier
);
