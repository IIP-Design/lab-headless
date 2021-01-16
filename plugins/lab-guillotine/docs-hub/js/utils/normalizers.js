import { buildResourcePath, filterTree } from './filters';

/**
 * Adds name and path properties to an existing object.
 *
 * @param {Object} obj           Object to be augmented.
 * @param {string} filename      Name of the file or sub-directory.
 * @param {string} subdirectory  Directory relative to the repo root.
 * @returns {Object|null}        The object with new properties or null if no object provided.
 */
const constructMdEntry = ( obj, filename, subdirectory ) => {
  if ( !obj ) {
    return null;
  }

  return {
    ...obj,
    name: filename,
    path: buildResourcePath( `${filename}.md`, subdirectory ),
  };
};

/**
 * Normalizes the repo data to enable the construction of a documentation file tree.
 *
 * @param {Object} data          Repo data retrieved from the GitHub API.
 * @param {string} subdirectory  Directory relative to the repo root.
 * @returns {Object}             An object with the properties changelog, readme, and docs.
 */
export const parseRepoTree = ( data, subdirectory ) => ( {
  changelog: constructMdEntry( data?.repository?.changelog, 'CHANGELOG', subdirectory ),
  readme: constructMdEntry( data?.repository?.readme, 'README', subdirectory ),
  docs: filterTree( data?.repository?.docs?.entries ),
} );

/**
 * Converts an array of branch nodes into a list of branch names.
 *
 * @param {Object[]} nodes   A list of ref nodes corresponding to the branches on the repo.
 * @returns {string[]}       A list of branch names.
 */
export const parseBranches = nodes => {
  if ( !nodes ) {
    return [];
  }

  return nodes.map( node => node.name );
};

/**
 * Convert the repo docs tree into an array of its component files.
 *
 * @param {Object} repoTree   The directory tree for the repo's documentation.
 * @returns {Object[]}        List of file data objects.
 */
export const flattenTree = repoTree => {
  const { changelog, readme, docs } = repoTree;

  let leaves = [];

  if ( docs ) {
    leaves = docs.map( leaf => {
      if ( !leaf.contents ) {
        return leaf;
      }

      return leaf.contents;
    } );
  }

  return [
    ...leaves.flat(), changelog, readme,
  ];
};

export const createPageList = ( selected, ignored ) => {
  const selectedTrue = selected.map( item => {
    // Skip empty items.
    if ( !item ) {
      return;
    }

    item.selected = true;

    return item;
  } );

  const selectedFalse = ignored.map( item => {
    item.selected = false;

    return item;
  } );

  return [...selectedTrue, ...selectedFalse];
};

/**
 * Compile a repository reference string from all of the repo parts.
 *
 * @param {string} owner The name of the GitHub owner.
 * @param {string} repo The name of the git repository.
 * @param {string} subdir The name of the subdirectory if any.
 * @param {string} branch The name of the git branch.
 * @return {string} The compiled parent string.
 */
export const createParentString = ( owner, repo, subdir, branch ) => {
  const o = owner ? `${owner}/` : '';
  const r = repo || '';
  const s = subdir ? `/${subdir}` : '';
  const b = branch ? `@${branch}` : '';

  return `${o}${r}${s}${b}`;
};

/**
 * Removes all of the text preceded by the final slash in a string.
 *
 * @param {string} string The text to check for a slash.
 * @returns {string} Everything following the final slash in the text.
 */
const getEndOfPath = string => {
  const re = /[^/]+$/;

  return string.match( re )[0];
};

/**
 * Converts a provided string into title case (i.e. every word capitalized).
 *
 * @param {string} string String to be converted to title case.
 * @returns {string} Provided string in title case.
 */
const titleCased = string => {
  if ( typeof string !== 'string' ) return '';

  const spaced = string.replace( /-/g, ' ' );

  const words = spaced.split( ' ' );

  return words.map( word => word[0].toUpperCase() + word.substring( 1 ) ).join( ' ' );
};

/**
 * Trims the final portion of a filepath and converts it to title case.
 *
 * @param {string} string The repo file path to be turned into a title.
 * @returns {string} The generated title text.
 */
export const convertPathToTitle = string => {
  const end = getEndOfPath( string );

  return titleCased( end );
};
