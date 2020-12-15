/** @jsx */

import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import MetaTextInput from '../../../js/shared/components/MetaTextInput';

const DocsDocumentPanel = () => (
  <PluginDocumentSettingPanel
    className="github-link-panel"
    name="github-link-panel"
    title="Link a GitHub Repository"
  >
    <MetaTextInput
      label="Add repo URL:"
      metaValue="gpalab_docs_github_repo"
      placeholder="https://github.com/..."
    />
  </PluginDocumentSettingPanel>
);

export default DocsDocumentPanel;
