import propTypes from 'prop-types';

export const leafType = propTypes.shape( {
  name: propTypes.string,
  oid: propTypes.string,
  path: propTypes.string,
  type: propTypes.string,
} );

export const repoType = propTypes.shape( {
  branch: propTypes.string,
  owner: propTypes.string,
  parent: propTypes.string,
  repo: propTypes.string,
  subdir: propTypes.string,
  title: propTypes.string,
} );
