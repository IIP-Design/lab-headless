module.exports = {
  'extends': ['../../.eslintrc'],
  ignorePatterns: [
    'node_modules/', 'build/', 'build-dev/', 'vendor/',
  ],
  parser: 'babel-eslint',
  root: true,
  rules: {
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    'node/no-missing-import': [
      'error', {
        allowModules: ['docs-hub', 'shared'],
      },
    ],
    'node/no-unpublished-import': [
      'error', {
        allowModules: ['prop-types'],
      },
    ],
    'node/no-unpublished-require': [
      'error', {
        allowModules: ['@wordpress/scripts'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          'docs-hub': './docs-hub/js',
          shared: './js/shared',
        },
        root: ['.'],
      },
    },
  },
};
