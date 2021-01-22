/**
 * Finds all the page subdirectory names.
 * Additionally, returns all pages not in a subdirectory.
 *
 * @param {Object[]} pages List of documentation pages to be ordered.
 */
const findSubDirs = pages => {
  const temp = [];
  const notNested = [];

  pages.forEach( doc => {
    const match = doc.pagePath.match( /\//g ) || [];

    if ( match.length === 2 ) {
      const dirName = doc.pagePath.match( /\/(.*?)\// )[1];

      temp.push( dirName );
    } else {
      notNested.push( doc );
    }
  } );

  return {
    dirs: [...new Set( temp )],
    notNested,
  };
};

/**
 * Identify one page from a list of pages as the index page.
 * If a page is named index.md it is selected, otherwise the first page is chosen.
 *
 * @param {Object[]} pages List of documentation pages to be ordered.
 */
const findIndex = pages => {
  const indices = pages.filter( page => page.pageName === 'index.md' );
  const sansIndex = pages.filter( page => page.pageName !== 'index.md' );

  // Get all but the first page in the pages array.
  const [, ...rest] = pages;

  const index = indices.length ? indices[0] : pages[0];
  const remainder = indices.length ? sansIndex : rest;

  return { index, remainder };
};

/**
 * Constructs the nested structure for docs pages.
 *
 * @param {Object[]} pages List of documentation pages to be ordered.
 */
const nestPages = pages => {
  const { dirs, notNested } = findSubDirs( pages );

  const { index, remainder } = findIndex( notNested );

  const nested = [...remainder];

  dirs.forEach( dir => {
    const contents = [];

    pages.forEach( doc => {
      if ( doc.pagePath.match( `^docs/${dir}` ) ) {
        contents.push( doc );
      }
    } );

    const { index: idx, remainder: rem } = findIndex( contents );

    nested.push( { dirName: dir, index: idx, pages: rem } );
  } );

  return { index, nested };
};

/**
 * Orders the pages returned from the GraphQL query into a form usable by the table of contents.
 *
 * @param {Object[]} pages List of documentation pages to be ordered.
 */
export const orderPages = pages => {
  const changelog = pages.filter( page => page.pageName === 'CHANGELOG' )[0];
  const readme = pages.filter( page => page.pageName === 'README' )[0];
  const remainder = pages.filter( page => page.pageName !== 'CHANGELOG' && page.pageName !== 'README' );

  const { index, nested: docs } = nestPages( remainder );

  return { changelog, docs, index, readme };
};
