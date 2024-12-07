/** @typedef { import('prettier').Config } PrettierConfig */
/** @typedef { import('@trivago/prettier-plugin-sort-imports').PluginConfig } SortImportsConfig */

/**
 * @type {PrettierConfig & SortImportsConfig}
 */
const prettierConfig = {
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    // Code style
    semi: true,
    tabWidth: 4,
    printWidth: 100,
    endOfLine: 'lf',
    singleQuote: true,
    jsxSingleQuote: false,
    trailingComma: 'none',
    arrowParens: 'avoid',
    bracketSameLine: false,
    // Import sort
    importOrder: [
        '^react$',
        '^[A-z]',
        '^@[^/]',
        '^@/',
        '^\\../',
        '^\\./',
        '^.+.s?css$',
        '^\\u0000.+'
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy']
};

export default prettierConfig;
