import { registerPlugin } from '@wordpress/plugins';

import EventDocumentPanel from './components/EventDocumentPanel';

registerPlugin( 'gpalab-guillotine-event-panel', {
  icon: null,
  render: EventDocumentPanel,
} );
