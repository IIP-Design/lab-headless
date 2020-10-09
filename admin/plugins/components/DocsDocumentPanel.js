/** @jsx */

import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

const DocsDocumentPanel = () => (
  <PluginDocumentSettingPanel name="github-link-panel" title="Link GitHub Repo" className="github-link-panel">
    Link to documentation in a GitHub repository
  </PluginDocumentSettingPanel>
);

export default DocsDocumentPanel;
