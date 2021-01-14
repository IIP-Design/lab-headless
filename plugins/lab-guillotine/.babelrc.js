module.exports = {
  presets: [require.resolve('@wordpress/babel-preset-default')],
  plugins: [
    [ 
      "babel-plugin-module-resolver",
      {
        alias: {
          "docs-hub": "./docs-hub/js",
          shared: "./js/shared"
        },
        extensions: [
          '.js', '.jsx', '.css', '.scss',
        ],
      }
    ]
  ]
}