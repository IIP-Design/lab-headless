import propTypes from 'prop-types';

import { docsPageProps } from 'lib/proptypes';
import { formatTocItem } from 'lib/format';
import { getButtonStyle } from './utils';

const NavItem = ( { callback, item, name, selected } ) => {
  const btnText = name || item.pageName;

  return (
    <li>
      <button
        className={ getButtonStyle( false, selected === item.pageName ) }
        type="button"
        onClick={ () => callback( item.pageName ) }
      >
        { formatTocItem( btnText ) }
      </button>
    </li>
  );
};

NavItem.propTypes = {
  callback: propTypes.func,
  item: docsPageProps,
  name: propTypes.string,
  selected: propTypes.string,
};

export default NavItem;
