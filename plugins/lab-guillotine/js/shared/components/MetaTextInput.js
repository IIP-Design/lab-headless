/** @jsx */

import { compose } from '@wordpress/compose';
import { TextControl } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';

const MetaTextInput = compose(
  withDispatch( ( dispatch, { metaValue } ) => ( {
    setTextValue( val ) {
      dispatch( 'core/editor' )
        .editPost(
          { meta: { [metaValue]: val } },
        );
    },
  } ) ),
  withSelect( ( select, { metaValue } ) => ( {
    text: select( 'core/editor' )
      .getEditedPostAttribute( 'meta' )[metaValue],
  } ) ),
)( ( { label, placeholder, text, setTextValue } ) => (
  <TextControl
    label={ label }
    placeholder={ placeholder }
    value={ text }
    onChange={ setTextValue }
  />
) );

export default MetaTextInput;
