import propTypes from 'prop-types';

export const leafType = propTypes.shape( {
  name: propTypes.string,
  oid: propTypes.string,
  path: propTypes.string,
  type: propTypes.string,
} );
