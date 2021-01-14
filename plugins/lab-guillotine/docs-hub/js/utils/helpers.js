/**
 * Ensure that a file tree is not empty.
 *
 * @param {Object} tree A documentation file tree.
 */
export const hasFiles = tree => tree.changelog || tree.readme || tree.docs;
