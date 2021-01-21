import propTypes from 'prop-types';

export const docsPage = propTypes.shape( {
  pageContent: propTypes.string,
  pageName: propTypes.string,
  pagePath: propTypes.string,
} );
