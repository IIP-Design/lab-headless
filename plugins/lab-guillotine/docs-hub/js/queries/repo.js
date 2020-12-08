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

export const QueryDirectoryTree = `
  query QueryDirectoryTree(
    $owner: String!,
    $repo: String!,
    $dir: String!
  ){
    repository( name: $repo, owner: $owner ) {
      object( expression: $dir ) {
        ... on Tree {
          entries {
            name
            path
            type
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
      defaultBranchRef {
        name
      }
    }
  }
`;
