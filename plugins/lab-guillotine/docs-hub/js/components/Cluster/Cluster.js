import propTypes from 'prop-types';

import Leaf from '../Leaf/Leaf';

import { leafType } from 'docs-hub/utils/reusable-proptypes';

import './Cluster.css';

const Cluster = ( { id, leaves, name } ) => (
  <div key={ id } className="gpalab-docs-cluster">
    <strong>{ `${name}/` }</strong>
    <ul className="gpalab-docs-leaves">
      { leaves && leaves.map( ( leaf, idx ) => (
        <Leaf key={ leaf.oid } data={ leaf } final={ idx === leaves.length - 1 } />
      ) ) }
    </ul>
  </div>
);

Cluster.propTypes = {
  id: propTypes.string,
  leaves: propTypes.arrayOf( leafType ),
  name: propTypes.string,
};

export default Cluster;
