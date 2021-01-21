import gfm from 'remark-gfm';
import propTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import CodeBlock from '../CodeBlock/CodeBlock';

import { docsPage } from '../../lib/proptypes';

import style from './DocPageBody.module.scss';

const DocPageBody = ( { page, visible } ) => {
  if ( visible ) {
    return (
      <div className={ style.content }>
        <ReactMarkdown plugins={ [gfm] } renderers={ { code: CodeBlock } }>
          { page.pageContent }
        </ReactMarkdown>
      </div>
    );
  }

  return null;
};

DocPageBody.propTypes = {
  page: docsPage,
  visible: propTypes.bool,
};

export default DocPageBody;
