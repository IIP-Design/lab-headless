import propTypes from 'prop-types';

import { docsPage } from '../../lib/proptypes';
import { formatTocItem } from '../../lib/format';

import style from './TableOfContents.module.scss';

const TableOfConstants = ( { callback, pages } ) => (
  <nav className={ style.container }>
    <ul className={ style.list }>
      { pages && pages.map( page => (
        <li key={ page.pagePath }>
          <button type="button" onClick={ () => callback( page.pageName ) }>
            { formatTocItem( page.pageName ) }
          </button>
        </li>
      ) ) }
    </ul>
  </nav>
);

TableOfConstants.propTypes = {
  callback: propTypes.func,
  pages: propTypes.arrayOf( docsPage ),
};

export default TableOfConstants;
