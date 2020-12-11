import propTypes from 'prop-types';
import { useContext, useState } from '@wordpress/element';

import { ConnectRepoContext } from '../../context/connectRepoContext';
import { leafType } from '../../utils/reusable-proptypes';

import './Leaf.css';

const Leaf = ( { data, final, ...rest } ) => {
  const [checked, setChecked] = useState( true );

  const { dispatch } = useContext( ConnectRepoContext );

  const handleToggle = leafData => {
    dispatch( { type: checked ? 'leaf-remove' : 'leaf-add', payload: leafData } );
    setChecked( !checked );
  };

  return (
    <span className="gpalab-docs-leaf" { ...rest }>
      { `${final ? '└──' : '├──'} ${data.name}` }
      <input
        checked={ checked }
        className="gpalab-docs-leaf-checkbox"
        type="checkbox"
        onChange={ () => handleToggle( data ) }
      />
    </span>
  );
};

Leaf.propTypes = {
  data: leafType,
  'final': propTypes.bool,
};

export default Leaf;
