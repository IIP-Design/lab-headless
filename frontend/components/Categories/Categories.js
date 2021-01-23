import { categoriesProps } from '../../lib/proptypes';

import style from './Categories.module.scss';

const Categories = ( { categories } ) => (
  <span className={ style.span }>
    under
    { categories.edges.length > 0
      ? (
        categories.edges.map( ( category, index ) => (
          <span key={ index } className={ style.category }>
            { category.node.name }
          </span>
        ) )
      )
      : (
        <span className={ style.category }>{ categories.edges.node.name }</span>
      ) }
  </span>
);

Categories.propTypes = {
  categories: categoriesProps,
};

export default Categories;
