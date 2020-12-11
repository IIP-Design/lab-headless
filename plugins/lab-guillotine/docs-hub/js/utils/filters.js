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
 * If object entry is a file, remove it's object property, otherwise convert that to a sub-tree.
 *
 * @param {Object[]} entries  A list of files/sub-directories in a repo directory.
 * @returns {Object[]}        A list of files/sub-directories mapped contents.
 */
const mapContents = entries => entries.map( entry => {
  const { object, ...rest } = entry;

  if ( entry.type === 'blob' ) {
    return rest;
  }

  const contents = object.entries.map( child => child );

  rest.contents = contents;

  return rest;
} );

/**
 * Filters a list of directory contents to remove unwanted files and directories.
 *
 * @param {Object[]} entries  A list of files/sub-directories in a repo directory.
 * @returns {Object[]|null}   A list of files/sub-directories excluding unwanted files/directories.
 */
export const filterTree = entries => {
  if ( !entries ) {
    return null;
  }

  return mapContents( isNotAssetsDir( noLeadingUnderscore( isNotGemfile( entries ) ) ) );
};

/**
 * Check whether a string ends in a slash and appends one if it does not.
 *
 * @param {string} string   The string to check for a trailing slash.
 * @returns {string}   The provided string with a slash appended to the end (if once wasn't there).
 */
const ensureTrailingSlash = string => {
  const hasSlash = string.slice( -1 ) === '/';

  if ( hasSlash ) {
    return string;
  }

  return `${string}/`;
};

/**
 * Constructs a filename from a resource name and possible parent directory where the resource resides.
 *
 * @param {string} resource      File or directory name to search for.
 * @param {string} subdirectory  Directory to search in relative to the repo root.
 */
export const buildResourcePath = ( resource, subdirectory ) => {
  const path = subdirectory ? ensureTrailingSlash( subdirectory ) : '';

  return `${path}${resource || ''}`;
};

/**
 * Construct the pathname used by the GraphQL object expression.
 *
 * @param {string} branch        Branch name.
 * @param {string} resource      File or directory name to search for.
 * @param {string} subdirectory  Directory to search in relative to the repo root.
 * @returns {string}             The path assembled from all the provided values.
 */
export const buildPath = ( branch, resource, subdirectory ) => {
  const resourcePath = buildResourcePath( resource, subdirectory );

  return `${branch}:${resourcePath}`;
};
