import { filterTree } from './utils/filters';
import { QueryDefaultBranch, QueryDirectoryTree } from './queries/repo';

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
    console.error( json.errors );
    throw new Error( 'Failed to fetch API' );
  }

  return json.data;
};

/**
 * Returns a list of files or
 *
 * @param {Object} variables Variables to be passed to the GraphQL query.
 * @param {string} token     GitHub personal access token.
 * @returns {Object[]}       A list of files/sub-directories in a repo directory.
 */
export const getRepoFiles = async ( variables, token ) => {
  const data = await fetchAPI( QueryDirectoryTree, variables, token );

  const { entries } = data.repository.object;

  const filtered = filterTree( entries );

  return filtered;
};

/**
 * Returns the default branch for a given GitHub repository.
 *
 * @param {Object} variables Variables to be passed to the GraphQL query.
 * @param {string} token     GitHub personal access token.
 * @returns {string}         The name of the default branch.
 */
export const getDefaultBranch = async ( variables, token ) => {
  const data = await fetchAPI( QueryDefaultBranch, variables, token );

  return data.repository.defaultBranchRef.name;
};
