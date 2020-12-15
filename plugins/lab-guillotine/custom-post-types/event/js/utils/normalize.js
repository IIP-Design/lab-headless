/**
 * Parses the GMT offset into the "-05:00" format and appends to the date.
 *
 * @param {string} date  A date string in the format YYYY-mm-ddTHH:ii:ss.
 * @param {string} tz    The GMT offset value.
 */
export const normalizeDateString = ( date, tz ) => {
  let hour;
  let minutes = '00';

  if ( tz.endsWith( '.5' ) ) {
    minutes = '30';
  } else if ( tz.endsWith( '.75' ) ) {
    minutes = '45';
  }

  const noMins = tz.split( '.' )[0];

  if ( noMins.startsWith( '-' ) ) {
    if ( noMins.length === 2 ) {
      hour = `${noMins.slice( 0, 1 )}0${noMins.slice( 1 )}`;
    } else {
      hour = noMins;
    }
  } else if ( noMins.length === 1 ) {
    hour = `+0${noMins}`;
  } else {
    hour = `+${noMins}`;
  }

  return `${date}${hour}:${minutes}`;
};
