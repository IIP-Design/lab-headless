import propTypes from 'prop-types';

import styles from './PostTitle.module.scss';

const PostTitle = ( { children } ) => (
  <h1
    className={ styles.title }
    dangerouslySetInnerHTML={ { __html: children } }
  />
);

PostTitle.propTypes = {
  children: propTypes.node,
};

export default PostTitle;
