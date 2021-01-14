/**
 * Sends an AJAX request to save input repo data.
 *
 * @param {Object} data Information for the give repository to be stored in the DB.
 * @param {onSuccess} onSuccess Function to be run when the AJAX request completes successfully.
 */
export const saveRepoData = async ( data, onSuccess ) => {
  // Get values provided to the client by the server
  const fromPHP = window?.gpalabDocsHub || {};

  const formData = new FormData();

  formData.append( 'action', 'gpalab_docs_hub_save' );
  formData.append( 'security', fromPHP.docsHubNonce );
  formData.append( 'data', JSON.stringify( data ) );

  try {
    const response = await fetch( fromPHP.ajaxUrl, {
      method: 'POST',
      body: formData,
    } );

    const result = await response.json();

    onSuccess( result );
  } catch ( err ) {
    throw new Error( `Fetch failed, ${JSON.stringify( err )}` );
  }
};
