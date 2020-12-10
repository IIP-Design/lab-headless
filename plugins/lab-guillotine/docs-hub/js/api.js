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
 * @param {string} branch    The repo branch name against which to search.
 * @returns {Object}         A list of files/sub-directories in a repo directory.
 */
export const getRepoFiles = async ( variables, token, branch ) => {
  const files = [
    { alias: 'changelog', path: `${branch}:CHANGELOG.md` },
    { alias: 'readme', path: `${branch}:README.md` },
  ];

  const data = await fetchAPI( QueryDirectoryTree( files ), variables, token );

  const { entries } = data.repository.object;

  const filtered = filterTree( entries );

  const fullTree = {
    changelog: data.repository.changelog,
    readme: data.repository.readme,
    tree: filtered,
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
    defaultBranch: data.repository.defaultBranchRef.name,
  };
};
