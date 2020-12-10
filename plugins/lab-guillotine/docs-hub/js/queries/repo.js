export const QueryFileText = `
  query QueryFileText(
    $owner: String!,
    $repo: String!,
    $filepath: String!
  ){
    repository( name: $repo, owner: $owner ) {
      object( expression: $filepath ) {
        ... on Blob {
          text
        }
      }
    }
  }
`;

export const QueryDirectoryTree = ( files = [] ) => `
  query QueryDirectoryTree(
    $owner: String!,
    $repo: String!,
    $dir: String!
  ){
    repository( name: $repo, owner: $owner ) {
      ${files.map( file => `
        ${file.alias}:object( expression: "${file.path}" ) {
          ... on Blob {
            oid
          }
        }
      ` )}
      object( expression: $dir ) {
        ... on Tree {
          entries {
            name
            oid
            path
            type
            object {
              ... on Tree {
                entries {
                  name
                  oid
                  path
                  type
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const QueryDefaultBranch = `
  query QueryDefaultBranch(
    $owner: String!,
    $repo: String!
  ){
    repository( name: $repo, owner: $owner ) {
      refs(refPrefix: "refs/heads/", first: 10) {
        nodes {
          name
        }
      }
      defaultBranchRef {
        name
      }
    }
  }
`;
