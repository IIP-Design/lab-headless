import propTypes from 'prop-types';

import Cluster from '../Cluster/Cluster';
import Leaf from '../Leaf/Leaf';

import { leafType } from '../../utils/reusable-proptypes';

import './Tree.css';

const Tree = ( { changelog, readme, tree } ) => (
  <div className="gpalab-docs-file-tree">
    { changelog && <Leaf data={ { name: 'CHANGELOG' } } style={ { marginLeft: 0 } } /> }
    { readme && <Leaf data={ { name: 'README' } } style={ { marginLeft: 0 } } /> }
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
  changelog: propTypes.shape( {
    oid: propTypes.string,
  } ),
  readme: propTypes.shape( {
    oid: propTypes.string,
  } ),
  tree: propTypes.arrayOf(
    propTypes.shape( {
      contents: propTypes.arrayOf( leafType ),
      ...leafType,
    } ),
  ),
};

export default Tree;
