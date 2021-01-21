import propTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { docsPage } from '../../lib/proptypes';

const DocPageBody = ( { page, visible } ) => {
  if ( visible ) {
    return (
      <ReactMarkdown>
        { page.pageContent }
      </ReactMarkdown>
    );
  }

  return null;
};

DocPageBody.propTypes = {
  page: docsPage,
  visible: propTypes.bool,
};

export default DocPageBody;
