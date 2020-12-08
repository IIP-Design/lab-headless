/**
 * Removes Gemfiles from a list of directory contents.
 *
 * @param {Object[]} entries  A list of files/sub-directories in a repo directory.
 * @returns {Object[]}        A list of files/sub-directories excluding any Gemfile.
 */
const isNotGemfile = entries => entries.filter( entry => entry.name !== 'Gemfile' );

/**
 * Removes the assets directory from a list of directory contents.
 *
 * @param {Object[]} entries  A list of files/sub-directories in a repo directory.
 * @returns {Object[]}        A list of files/sub-directories excluding any directory called assets.
 */
const isNotAssetsDir = entries => entries.filter( entry => {
  if ( entry.type === 'tree' ) {
    return entry.name !== 'assets';
  }

  return entry;
} );

/**
 * Removes items with a leading underscore from a list of directory contents.
 *
 * @param {Object[]} entries  A list of files/sub-directories in a repo directory.
 * @returns {Object[]}        A list of files/sub-directories excluding any with a leading underscore.
 */
const noLeadingUnderscore = entries => entries.filter( entry => entry.name.charAt( 0 ) !== '_' );

/**
 * Filters a list of directory contents to remove unwanted files and directories.
 *
 * @param {Object[]} entries  A list of files/sub-directories in a repo directory.
 * @returns {Object[]}        A list of files/sub-directories excluding unwanted files/directories.
 */
export const filterTree = entries => isNotAssetsDir( noLeadingUnderscore( isNotGemfile( entries ) ) );
