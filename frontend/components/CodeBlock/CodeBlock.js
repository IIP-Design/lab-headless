import dynamic from 'next/dynamic';
import propTypes from 'prop-types';

const Highlight = dynamic( () => import( /* webpackChunkName: "Highlight" */ 'react-highlight' ) );

const CodeBlock = ( { language = 'text', value } ) => (
  <Highlight className={ language } language={ language }>
    { value }
  </Highlight>
);

CodeBlock.propTypes = {
  value: propTypes.string.isRequired,
  language: propTypes.string,
};

export default CodeBlock;
