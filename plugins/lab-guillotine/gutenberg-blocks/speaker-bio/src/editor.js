import propTypes from 'prop-types';
import { FormFileUpload, Placeholder } from '@wordpress/components';

import { i18nize } from '../../../js/shared/utils/helpers';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} [props] Properties passed from the editor.
 * @param {string} [props.bio] The speaker's biographic information.
 * @param {string} [props.name] The speaker's name.
 * @param {string} [props.title] The speaker's title.
 * @param {updateValue} [props.updateValue] Callback function to update the block's data.
 *
 * @return {WPElement} Element to render.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 */
const SpeakerBioEditor = ( { bio, name, title, updateValue } ) => (
  <Placeholder>
    <form className="gpalab-speaker-form">
      <FormFileUpload
        accept="image/*"
        children={ i18nize( 'Upload speaker image' ) }
        className="gpalab-speaker-file-uploader"
        icon="upload"
        onChange={ () => console.log( 'new image' ) }
      />
      <div className="gpalab-speaker-field-group">
        <label htmlFor="gpalab-speaker-name">
          { i18nize( 'Speaker Name' ) }
          <input
            id="gpalab-speaker-name"
            name="name"
            type="text"
            value={ name }
            onChange={ updateValue }
          />
        </label>
        <label htmlFor="gpalab-speaker-title">
          { i18nize( 'Speaker Title' ) }
          <input
            id="gpalab-speaker-title"
            name="title"
            type="text"
            value={ title }
            onChange={ updateValue }
          />
        </label>
        <label htmlFor="gpalab-speaker-bio">
          { i18nize( 'Speaker Bio' ) }
          <textarea
            id="gpalab-speaker-bio"
            name="bio"
            value={ bio }
            onChange={ updateValue }
          />
        </label>
      </div>
    </form>
  </Placeholder>
);

SpeakerBioEditor.propTypes = {
  bio: propTypes.string,
  name: propTypes.string,
  title: propTypes.string,
  updateValue: propTypes.func,
};

export default SpeakerBioEditor;
