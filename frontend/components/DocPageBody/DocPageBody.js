import dynamic from 'next/dynamic';
import gfm from 'remark-gfm';
import propTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import { docsPageProps } from '../../lib/proptypes';

import style from './DocPageBody.module.scss';

const CodeBlock = dynamic( () => import( /* webpackChunkName: "CodeBlock" */ '../../components/CodeBlock/CodeBlock' ) );

const DocPageBody = ( { page, visible } ) => {
  if ( visible ) {
    return (
      <div className={ page.pageName === 'README' ? `${style.content} ${style.readme}` : style.content }>
        <ReactMarkdown plugins={ [gfm] } renderers={ { code: CodeBlock } }>
          { page.pageContent }
        </ReactMarkdown>
      </div>
    );
  }

  return null;
};

DocPageBody.propTypes = {
  page: docsPageProps,
  visible: propTypes.bool,
};

export default DocPageBody;
