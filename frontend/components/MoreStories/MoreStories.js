import propTypes from 'prop-types';

import PostPreview from 'components/PostPreview/PostPreview';

import style from './MoreStories.module.scss';

const MoreStories = ( { posts } ) => {
  if ( posts ) {
    return (
      <section>
        <h2 className={ style.title }>
          More Stories
        </h2>
        <div className={ style.grid }>
          { posts.map( ( { node } ) => {
            if ( node ) {
              return (
                <PostPreview
                  key={ node?.slug }
                  title={ node?.title }
                  coverImage={ node?.featuredImage?.node }
                  date={ node?.date }
                  author={ node?.author?.node }
                  slug={ node?.slug }
                  excerpt={ node?.excerpt }
                />
              );
            }

            return null;
          } ) }
        </div>
      </section>
    );
  }

  return null;
};

MoreStories.propTypes = {
  posts: propTypes.array,
};

export default MoreStories;
