import propTypes from 'prop-types';

import { i18nize } from 'shared/utils/helpers';

import './ErrorMsg.css';

const ErrorMsg = ( { error } ) => (
  <div className="gpalab-docs-error-container">
    <strong className="gpalab-docs-error-title">
      { `${i18nize( 'Error' )}${error.type ? ` - ${error.type}` : ''}` }
    </strong>
    { error.message && ( error.message ) }
  </div>
);

ErrorMsg.propTypes = {
  error: propTypes.shape( {
    message: propTypes.string,
    type: propTypes.string,
  } ),
};

export default ErrorMsg;
