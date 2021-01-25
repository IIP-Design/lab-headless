import { tagsProps } from 'lib/proptypes';

import style from './Tags.module.scss';

const Tags = ( { tags } ) => (
  <div className={ style.container }>
    <p className={ style.tagged }>
      Tagged
      { tags.edges.map( ( tag, index ) => (
        <span key={ index } className={ style.tag }>
          { tag.node.name }
        </span>
      ) ) }
    </p>
  </div>
);

Tags.propTypes = {
  tags: tagsProps,
};

export default Tags;
