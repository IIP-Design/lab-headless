import Highlight from '../Highlight/Highlight';
import propTypes from 'prop-types';

const CodeBlock = ( { language = 'text', value } ) => (
  <Highlight className={ language } languages={ [language] }>
    { value }
  </Highlight>
);

CodeBlock.propTypes = {
  value: propTypes.string.isRequired,
  language: propTypes.string,
};

export default CodeBlock;
