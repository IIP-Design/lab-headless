/** @jsx */

import { compose } from '@wordpress/compose';
import { TextControl } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';

const MetaTextInput = compose(
  withDispatch( ( dispatch, { metaValue } ) => ( {
    setRepoValue( val ) {
      dispatch( 'core/editor' )
        .editPost(
          { meta: { [metaValue]: val } },
        );
    },
  } ) ),
  withSelect( ( select, { label, metaValue, placeholder } ) => ( {
    label,
    placeholder,
    repo: select( 'core/editor' )
      .getEditedPostAttribute( 'meta' )[metaValue],
  } ) ),
)( ( { label, placeholder, repo, setRepoValue } ) => (
  <TextControl
    label={ label }
    placeholder={ placeholder }
    value={ repo }
    onChange={ setRepoValue }
  />
) );

export default MetaTextInput;
