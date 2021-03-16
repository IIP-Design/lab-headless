/** @jsx */

import { compose } from '@wordpress/compose';
import { CheckboxControl } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';

const MetaCheckbox = compose(
  withDispatch( ( dispatch, { metaValue } ) => ( {
    setVal( val ) {
      dispatch( 'core/editor' )
        .editPost(
          { meta: { [metaValue]: !val } },
        );
    },
  } ) ),
  withSelect( ( select, { metaValue } ) => ( {
    checked: select( 'core/editor' )
      .getEditedPostAttribute( 'meta' )[metaValue],
  } ) ),
)( ( { checked, heading, help, label, setVal } ) => (
  <CheckboxControl
    checked={ checked }
    heading={ heading || '' }
    help={ help || '' }
    label={ label || '' }
    onChange={ () => setVal( checked ) }
  />
) );

export default MetaCheckbox;
