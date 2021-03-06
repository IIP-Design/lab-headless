import propTypes from 'prop-types';

import Cluster from '../Cluster/Cluster';
import Leaf from '../Leaf/Leaf';

import { i18nize } from 'shared/utils/helpers';
import { leafType } from 'docs-hub/utils/reusable-proptypes';

import './Tree.css';

const Tree = ( { changelog, readme, tree } ) => (
  <div className="gpalab-docs-file-tree">
    { changelog && <Leaf data={ changelog } style={ { marginLeft: 0 } } /> }

    { readme && <Leaf data={ readme } style={ { marginLeft: 0 } } /> }

    { tree && <strong>docs/</strong> }

    { tree && tree.map( ( twig, idx ) => {
      if ( twig.type === 'blob' ) {
        return <Leaf key={ twig.oid } data={ twig } final={ idx === tree.length - 1 } />;
      }

      if ( twig.type === 'tree' ) {
        return <Cluster key={ twig.oid } id={ twig.oid } leaves={ twig.contents } name={ twig.name } />;
      }

      return null;
    } ) }

    { !changelog && !readme && !tree && (
      <p>{ i18nize( 'No documentation files found in this repository' ) }</p>
    ) }
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
