import Link from 'next/link';
import propTypes from 'prop-types';

import { coverImageProps } from 'lib/proptypes';

import style from './CoverImage.module.scss';

const CoverImage = ( { title, coverImage, slug } ) => {
  const image = (
    <img
      alt=""
      src={ coverImage?.sourceUrl }
      className={ slug ? `${style.image} ${style.linked}` : style.image }
    />
  );

  return (
    <div className={ style.container }>
      { slug
        ? (
          <Link href={ `/posts/${slug}` }>
            <a aria-label={ title }>{ image }</a>
          </Link>
        )
        : (
          image
        ) }
    </div>
  );
};

CoverImage.propTypes = {
  coverImage: coverImageProps,
  slug: propTypes.string,
  title: propTypes.string,
};

export default CoverImage;
