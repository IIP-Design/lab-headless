import { authorProps } from '../../lib/proptypes';

import style from './Avatar.module.scss';

const Avatar = ( { author } ) => {
  const name
    = author.firstName && author.lastName
      ? `${author.firstName} ${author.lastName}`
      : author.name;

  return (
    <div className={ style.container }>
      <img
        src={ author.avatar.url }
        className={ style.image }
        alt={ name }
      />
      <div className={ style.name }>{ name }</div>
    </div>
  );
};

Avatar.propTypes = {
  author: authorProps,
};

export default Avatar;
