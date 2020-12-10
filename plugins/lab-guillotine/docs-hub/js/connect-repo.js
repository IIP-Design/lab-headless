import { render } from '@wordpress/element';

import RepoWizard from './components/RepoWizard/RepoWizard';

const { githubDefaultOrg, githubToken } = window.gpalabDocsHub;

render(
  <RepoWizard owner={ githubDefaultOrg } token={ githubToken } />,
  document.getElementById( 'gpalab-docs-hub' ),
);
