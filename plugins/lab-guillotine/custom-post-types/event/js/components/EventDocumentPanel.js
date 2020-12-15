/** @jsx */

import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import MetaDateTimePicker from './MetaDateTimePicker';
import MetaTextInput from '../../../../js/shared/components/MetaTextInput';
import { i18nize } from '../../../../js/shared/utils/helpers';

const DocsDocumentPanel = () => (
  <PluginDocumentSettingPanel
    title={ i18nize( 'Select a event date' ) }
  >
    <MetaDateTimePicker
      metaValue="_gpalab_event_date"
    />
    <MetaTextInput
      label={ i18nize( 'Set the length of the event (in minutes)' ) }
      metaValue="_gpalab_event_duration"
      placeholder="60"
    />
  </PluginDocumentSettingPanel>
);

export default DocsDocumentPanel;
