const withBundleAnalyzer = require( '@next/bundle-analyzer' )( {
  enabled: process.env.ANALYZE === 'true',
} );

const highlightLanguages = [
  'apache',
  'bash',
  'css',
  'dockerfile',
  'http',
  'javascript',
  'json',
  'less',
  'makefile',
  'markdown',
  'php',
  'plaintext',
  'scss',
  'shell',
  'sql',
  'shell',
  'twig',
  'typescript',
  'xml',
  'yaml',
].join( '|' );

module.exports = withBundleAnalyzer( {
  webpack( config, { webpack } ) {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp( `^./(${highlightLanguages})$` ),
      ),
    );

    return config;
  },
} );
