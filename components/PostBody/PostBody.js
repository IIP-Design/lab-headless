import styles from './PostBody.module.scss';

const PostBody = ( { content } ) => (
  <div className="max-w-2xl mx-auto">
    <div
      className={ styles.content }
      dangerouslySetInnerHTML={ { __html: content } }
    />
  </div>
);

export default PostBody;
