import { Fragment } from 'react';
import propTypes from 'prop-types';

import Avatar from '../Avatar/Avatar';
import Categories from '../Categories/Categories';
import CoverImage from '../CoverImage/CoverImage';
import DateString from '../DateString/DateString';
import PostTitle from '../PostTitle/PostTitle';

import { authorProps, categoriesProps, coverImageProps } from '../../lib/proptypes';

import style from './PostHeader.module.scss';

const PostHeader = ( {
  title,
  coverImage,
  date,
  author,
  categories,
} ) => (
  <Fragment>
    <PostTitle>{ title }</PostTitle>
    <div className={ style.byline }>
      <Avatar author={ author } />
    </div>
    <div className={ style['image-container'] }>
      <CoverImage title={ title } coverImage={ coverImage } />
    </div>
    <div className={ style['meta-container'] }>
      <div className={ style['byline-mobile'] }>
        <Avatar author={ author } />
      </div>
      <div className={ style.meta }>
        { 'Posted ' }
        <DateString dateString={ date } />
        <Categories categories={ categories } />
      </div>
    </div>
  </Fragment>
);

PostHeader.propTypes = {
  author: authorProps,
  categories: categoriesProps,
  coverImage: coverImageProps,
  date: propTypes.string,
  title: propTypes.string,
};

export default PostHeader;
