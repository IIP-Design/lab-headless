/** @jsx */

import { PluginDocumentSettingPanel } from '@wordpress/edit-post';

import MetaCheckbox from 'shared/components/MetaCheckbox';
import MetaDateTimePicker from 'shared/components/MetaDateTimePicker';
import MetaTextInput from 'shared/components/MetaTextInput';
import Spacer from 'shared/components/Spacer';
import { i18nize } from 'shared/utils/helpers';

const DocsDocumentPanel = () => (
  <PluginDocumentSettingPanel
    title={ i18nize( 'Select a event date' ) }
  >
    <MetaDateTimePicker
      metaValue="_gpalab_event_date"
    />
    <Spacer />
    <MetaTextInput
      label={ i18nize( 'Set the length of the event (in minutes)' ) }
      metaValue="_gpalab_event_duration"
      placeholder="60"
    />
    <Spacer />
    <MetaCheckbox
      label={ i18nize( 'Show add to calendar button' ) }
      metaValue="_gpalab_event_show_atc"
    />
  </PluginDocumentSettingPanel>
);

export default DocsDocumentPanel;
