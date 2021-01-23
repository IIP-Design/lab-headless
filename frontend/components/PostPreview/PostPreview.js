import Link from 'next/link';
import propTypes from 'prop-types';

import Avatar from '../Avatar/Avatar';
import DateString from '../DateString/DateString';
import CoverImage from '../CoverImage/CoverImage';

import { authorProps, coverImageProps } from '../../lib/proptypes';

import style from './PostPreview.module.scss';

const PostPreview = ( {
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
} ) => (
  <article>
    <div className={ style['image-container'] }>
      <CoverImage title={ title } coverImage={ coverImage } slug={ slug } />
    </div>
    <h3 className={ style.title }>
      <Link href={ `/posts/${slug}` }>
        <a className={ style.link }>
          { title }
        </a>
      </Link>
    </h3>
    <div className={ style.date }>
      <DateString dateString={ date } />
    </div>
    <div
      className={ style.excerpt }
      dangerouslySetInnerHTML={ { __html: excerpt } }
    />
    <Avatar author={ author } />
  </article>
);

PostPreview.propTypes = {
  author: authorProps,
  coverImage: coverImageProps,
  date: propTypes.string,
  excerpt: propTypes.string,
  slug: propTypes.string,
  title: propTypes.string,
};

export default PostPreview;
