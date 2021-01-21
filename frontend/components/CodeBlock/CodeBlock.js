import Highlight from 'react-highlight';
import propTypes from 'prop-types';

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
