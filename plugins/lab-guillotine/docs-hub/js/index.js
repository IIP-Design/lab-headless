import { render } from '@wordpress/element';

import ConnectRepo from './components/ConnectRepo';
import ConnectedRepos from './components/ConnectedRepos/ConnectedRepos';

const fromPHP = window?.gpalabDocsHub || {};

render(
  <ConnectRepo />,
  document.getElementById( 'gpalab-docs-hub' ),
);

render(
  <ConnectedRepos repos={ fromPHP.connectedRepos } />,
  document.getElementById( 'gpalab-docs-hub-connected' ),
);
