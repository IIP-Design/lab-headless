import { buildPath, filterTree } from './filters';
import { QueryDefaultBranch, QueryDirectoryTree } from '../queries/repo';

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
 * @param {Object} variables     Variables to be passed to the GraphQL query.
 * @param {string} token         GitHub personal access token.
 * @param {string} branch        The repo branch name against which to search.
 * @param {string} subdirectory  Directory relative to the repo root.
 * @returns {Object}             A list of files/sub-directories in a repo directory.
 */
export const getRepoFiles = async ( variables, token, branch, subdirectory ) => {
  const dirs = [{ alias: 'docs', path: buildPath( branch, 'docs/', subdirectory ) }];

  const files = [
    { alias: 'changelog', path: buildPath( branch, 'CHANGELOG.md', subdirectory ) },
    { alias: 'readme', path: buildPath( branch, 'README.md', subdirectory ) },
  ];

  const data = await fetchAPI( QueryDirectoryTree( dirs, files ), variables, token );

  const entries = data?.repository?.docs?.entries;

  const filtered = entries ? filterTree( entries ) : null;

  const fullTree = {
    changelog: data?.repository?.changelog,
    readme: data?.repository?.readme,
    docs: filtered,
  };

  return fullTree;
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
    branches: data.repository.refs.nodes.map( node => node.name ),
    defaultBranch: data?.repository?.defaultBranchRef?.name,
  };
};
