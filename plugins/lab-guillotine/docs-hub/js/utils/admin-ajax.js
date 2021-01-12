export const saveRepoData = async data => {
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

    console.log( result );
  } catch ( err ) {
    console.error( err );
  }
};
