import { buildPath } from './filters';
import { parseBranches, parseRepoTree } from './normalizers';
import { QueryDefaultBranch, QueryDirectoryTree, QueryFileText } from 'docs-hub/queries/repo';

/**
 * Executes a fetch request against the GitHub GraphQL API.
 *
 * @param {string} query      A GraphQL query string.
 * @param {Object} variables  Variables to be passed to the GraphQL query.
 * @param {string} token      GitHub personal access token.
 * @returns {Object}          The data returned from the API.
 */
const fetchAPI = async ( query, variables, token ) => {
  const headers = { 'Content-Type': 'application/json' };

  if ( token ) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch( 'https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify( {
      query,
      variables,
    } ),
  } );

  const json = await res.json();

  if ( json.errors ) {
    const type = json.errors?.[0]?.type || '';
    const message = json.errors?.[0]?.message || '';

    throw new Error( `Fetch failed, ${type}: ${message}` );
  }

  return json.data;
};

/**
 * Searches for documentation files in a GitHub repo.
 *
 * @param {Object} variables     Variables to be passed to the GraphQL query.
 * @param {string} token         GitHub personal access token.
 * @param {string} branch        The repo branch name against which to search.
 * @param {string} subdirectory  Directory relative to the repo root.
 * @returns {Object}             A list of files/sub-directories in a repo directory.
 */
export const getRepoDocs = async ( variables, token, branch, subdirectory ) => {
  const dirs = [{ alias: 'docs', path: buildPath( branch, 'docs/', subdirectory ) }];

  const files = [
    { alias: 'changelog', path: buildPath( branch, 'CHANGELOG.md', subdirectory ) },
    { alias: 'readme', path: buildPath( branch, 'README.md', subdirectory ) },
  ];

  const data = await fetchAPI( QueryDirectoryTree( dirs, files ), variables, token );

  return parseRepoTree( data, subdirectory );
};

/**
 * Returns the default branch for a given GitHub repository.
 *
 * @param {Object} variables Variables to be passed to the GraphQL query.
 * @param {string} token     GitHub personal access token.
 * @returns {Object}         Object with two properties: a list of branches (limit 10) & the name of the default branch.
 */
export const getBranches = async ( variables, token ) => {
  const data = await fetchAPI( QueryDefaultBranch, variables, token );

  return {
    branches: parseBranches( data?.repository?.refs?.nodes ),
    defaultBranch: data?.repository?.defaultBranchRef?.name,
  };
};

/**
 * Get the contents of a given file on GitHub.
 *
 * @param {Object} variables Variables to be passed to the GraphQL query.
 * @param {string} token GitHub personal access token.
 * @return {string} The contents of the file (or empty string).
 */
const getFileText = async ( variables, token ) => {
  const data = await fetchAPI( QueryFileText, variables, token );

  return data?.repository?.object?.text || '';
};

/**
 * Iterate over a list of files and get their contents.
 *
 * @param {Object[]} list List of files to get their contents.
 * @param {Object} variables Variables to be passed to the GraphQL query.
 * @param {string} branch The repo branch name against which to search.
 * @param {string} token GitHub personal access token.
 * @return {Object[]} The list of files with their content added.
 */
export const getManyFiles = async ( list, variables, branch, token ) => {
  // Remove empty list items.
  const filtered = list.filter( item => item !== null );

  const withContent = filtered.map( async item => {
    if ( !item ) {
      return;
    }

    const allVariables = { ...variables, filepath: `${branch}:${item.path}` };

    const content = await getFileText( allVariables, token );

    item.content = content;

    return item;
  } );

  return Promise.all( withContent );
};
