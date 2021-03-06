import { useState } from 'react';
import propTypes from 'prop-types';

import DocPageBody from 'components/DocPageBody/DocPageBody';
import TableOfContents from 'components/TableOfContents/TableOfContents';

import { docsPageProps } from 'lib/proptypes';

import style from './DocsPage.module.scss';

const DocsPage = ( { data } ) => {
  const [selected, setSelected] = useState( 'README' );

  return (
    <div className={ style.container }>
      { data && <TableOfContents callback={ setSelected } pages={ data } selected={ selected } /> }
      <div>
        { data && data.map( page => (
          <DocPageBody key={ page.pagePath } page={ page } visible={ page.pageName === selected } />
        ) ) }
      </div>
    </div>
  );
};

DocsPage.propTypes = {
  data: propTypes.arrayOf(
    docsPageProps,
  ),
};

export default DocsPage;
