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
