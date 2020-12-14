/** @jsx */

import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import MetaDateTimePicker from './MetaDateTimePicker';
import { i18nize } from '../../../js/shared/utils/helpers';

const DocsDocumentPanel = () => (
  <PluginDocumentSettingPanel
    title={ i18nize( 'Select a event date' ) }
  >
    <MetaDateTimePicker
      metaValue="_gpalab_event_date"
    />
  </PluginDocumentSettingPanel>
);

export default DocsDocumentPanel;
