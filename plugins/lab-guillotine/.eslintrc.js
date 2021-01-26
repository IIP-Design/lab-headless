module.exports = {
  'extends': ['../../.eslintrc'],
  ignorePatterns: [
    'node_modules/', 'build/', 'build-dev/', 'vendor/',
  ],
  parser: 'babel-eslint',
  root: true,
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
