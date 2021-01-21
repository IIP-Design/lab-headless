import { compose } from 'ramda';

/**
 * Ensure that the provided value is a string before attempting to transform it.
 *
 * @param {string} string The text to be transformed.
 * @param {...func} rest List of transformations to be run against the provided string (run from right to left).
 */
const escapeHatch = ( string, ...rest ) => {
  if ( !string ) {
    return;
  }

  if ( typeof string !== 'string' ) {
    return string;
  }

  return compose( ...rest )( string );
};

/**
 * Removes the file extension from the end of the provided string.
 *
 * @param {string} string The text to be transformed.
 * @returns {string} The transformed string.
 */
const removeFileExtension = string => {
  const extensions = ['.md'];

  let temp = string;

  extensions.forEach( ext => {
    if ( temp.endsWith( ext ) ) {
      temp = temp.substring( 0, temp.indexOf( ext ) );
    }
  } );

  return temp;
};

/**
 * Replace all dashes (-) in the provided string with a space.
 *
 * @param {string} string The text to be transformed.
 * @returns {string} The transformed string.
 */
const removeDashes = string => string.replace( /-/g, ' ' );

/**
 * Capitalize each word in a string that may contain multiple words separated by a space.
 *
 * @param {string} string The text to be transformed.
 * @returns {string} The transformed string.
 */
const titleCase = string => {
  const words = string.split( ' ' );

  return words.map( word => word[0].toUpperCase() + word.substring( 1 ) ).join( ' ' );
};

/**
 * Transform a provided string so that it is better suited for the table of contents.
 *
 * @param {string} string The text to be transformed.
 * @returns {string} The transformed string.
 */
export const formatTocItem = string => escapeHatch( string, titleCase, removeDashes, removeFileExtension );
