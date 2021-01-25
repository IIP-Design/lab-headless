import propTypes from 'prop-types';

import 'styles/fonts.css';
import 'styles/index.css';
import 'styles/uswds.css';
import '../node_modules/@gpa-lab/styled-blocks/lib/lab-blocks.css';
import 'styles/highlight.css';

const MyApp = ( { Component, pageProps } ) => <Component { ...pageProps } />;

MyApp.propTypes = {
  Component: propTypes.func,
  pageProps: propTypes.object,
};

export default MyApp;
