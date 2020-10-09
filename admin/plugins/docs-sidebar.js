import { registerPlugin } from '@wordpress/plugins';

import DocsDocumentPanel from './components/DocsDocumentPanel';

registerPlugin( 'plugin-document-setting-panel-demo', {
  icon: null,
  render: DocsDocumentPanel,
} );
