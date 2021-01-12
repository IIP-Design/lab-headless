import { render } from '@wordpress/element';

import ConnectRepo from './components/ConnectRepo';
import ConnectedRepos from './components/ConnectedRepos/ConnectedRepos';

render(
  <ConnectRepo />,
  document.getElementById( 'gpalab-docs-hub' ),
);

render(
  <ConnectedRepos />,
  document.getElementById( 'gpalab-docs-hub-connected' ),
);
