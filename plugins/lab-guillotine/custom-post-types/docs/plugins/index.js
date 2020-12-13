import { registerPlugin } from '@wordpress/plugins';

import DocsDocumentPanel from './components/DocsDocumentPanel';

registerPlugin( 'gpalab-docs-cpt-panel', {
  icon: null,
  render: DocsDocumentPanel,
} );
