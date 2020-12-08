import { leafType } from '../../utils/reusable-proptypes';

const Leaf = ( { data } ) => ( <span>{ data.name }</span> );

Leaf.propTypes = {
  data: leafType,
};

export default Leaf;
