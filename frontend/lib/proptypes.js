import propTypes from 'prop-types';

export const authorProps = propTypes.shape( {
  avatar: propTypes.shape( {
    url: propTypes.string,
  } ),
  firstName: propTypes.string,
  lastName: propTypes.string,
  name: propTypes.string,
} );

export const categoriesProps = propTypes.shape( {
  edges: propTypes.arrayOf(
    propTypes.shape( {
      node: propTypes.shape( {
        name: propTypes.string,
      } ),
    } ),
  ),
} );

export const coverImageProps = propTypes.shape( {
  sourceUrl: propTypes.string,
} );

export const docsPageProps = propTypes.shape( {
  pageContent: propTypes.string,
  pageName: propTypes.string,
  pagePath: propTypes.string,
} );

export const tagsProps = propTypes.shape( {
  edges: propTypes.arrayOf(
    propTypes.shape( {
      node: propTypes.shape( {
        name: propTypes.string,
      } ),
    } ),
  ),
} );
