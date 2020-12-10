import propTypes from 'prop-types';

import { leafType } from '../../utils/reusable-proptypes';

import './Leaf.css';

const Leaf = ( { data, final, ...rest } ) => (
  <span className="gpalab-docs-leaf" { ...rest }>{ `${final ? '└──' : '├──'} ${data.name}` }</span>
);

Leaf.propTypes = {
  data: leafType,
  'final': propTypes.bool,
};

export default Leaf;
