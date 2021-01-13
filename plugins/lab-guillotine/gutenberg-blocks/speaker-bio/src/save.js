import { i18nize } from 'shared/utils/helpers';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
const SpeakerBio = props => {
  console.log( props );

  return (
    <p>
      { i18nize( 'Speaker Bio – hello from the saved content!' ) }
    </p>
  );
};

export default SpeakerBio;
