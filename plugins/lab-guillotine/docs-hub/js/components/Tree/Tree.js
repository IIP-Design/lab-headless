import propTypes from 'prop-types';

import Cluster from '../Cluster/Cluster';
import Leaf from '../Leaf/Leaf';

import { leafType } from '../../utils/reusable-proptypes';

import './Tree.css';

const Tree = ( { tree } ) => (
  <div className="gpalab-docs-file-tree">
    <strong>docs/</strong>
    { tree && tree.map( ( twig, idx ) => {
      if ( twig.type === 'blob' ) {
        return <Leaf key={ twig.oid } data={ twig } final={ idx === tree.length - 1 } />;
      }

      if ( twig.type === 'tree' ) {
        return <Cluster key={ twig.oid } id={ twig.oid } leaves={ twig.contents } name={ twig.name } />;
      }

      return null;
    } ) }
  </div>
);

Tree.propTypes = {
  tree: propTypes.arrayOf(
    propTypes.shape( {
      contents: propTypes.arrayOf( leafType ),
      ...leafType,
    } ),
  ),
};

export default Tree;
