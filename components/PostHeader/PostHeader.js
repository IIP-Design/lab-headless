import { Fragment } from 'react';

import Avatar from '../Avatar/Avatar';
import Categories from '../Categories/Categories';
import CoverImage from '../CoverImage/CoverImage';
import Date from '../Date/Date';
import PostTitle from '../PostTitle/PostTitle';

const PostHeader = ( {
  title,
  coverImage,
  date,
  author,
  categories,
} ) => (
  <Fragment>
    <PostTitle>{ title }</PostTitle>
    <div className="hidden md:block md:mb-12">
      <Avatar author={ author } />
    </div>
    <div className="mb-8 md:mb-16 sm:mx-0">
      <CoverImage title={ title } coverImage={ coverImage } />
    </div>
    <div className="max-w-2xl mx-auto">
      <div className="block md:hidden mb-6">
        <Avatar author={ author } />
      </div>
      <div className="mb-6 text-lg">
        Posted
        { ' ' }
        <Date dateString={ date } />
        <Categories categories={ categories } />
      </div>
    </div>
  </Fragment>
);

export default PostHeader;
