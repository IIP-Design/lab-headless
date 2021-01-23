import propTypes from 'prop-types';

import style from './PostBody.module.scss';

const PostBody = ( { content } ) => (
  <div className={ style.body }>
    <div
      className={ style.content }
      dangerouslySetInnerHTML={ { __html: content } }
    />
  </div>
);

PostBody.propTypes = {
  content: propTypes.string,
};

export default PostBody;
