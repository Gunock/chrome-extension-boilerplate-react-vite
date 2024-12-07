// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

import eslint from '@eslint/js';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginReact.configs.flat.recommended,
    eslintPluginReact.configs.flat['jsx-runtime'],
    {
        files: ['src/**/*.jsx', 'src/**/*.tsx'],
        plugins: {
            'react-hooks': eslintPluginReactHooks
        },
        rules: {
            ...eslintPluginReactHooks.configs.recommended.rules
        }
    },
    eslintConfigPrettier,
    {
        settings: {
            react: {
                version: 'detect'
            }
        },
        ignores: ['dist', 'node_modules', '.yarn']
    }
);
