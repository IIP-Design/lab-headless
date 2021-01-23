import propTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

const DateString = ( { dateString } ) => {
  const date = parseISO( dateString );

  return <time dateTime={ dateString }>{ format( date, 'LLLL d, yyyy' ) }</time>;
};

DateString.propTypes = {
  dateString: propTypes.string,
};

export default DateString;
