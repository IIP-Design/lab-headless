/** @jsx */

import { compose } from '@wordpress/compose';
import { DateTimePicker } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';

const MetaDateTimePicker = compose(
  withDispatch( ( dispatch, { metaValue } ) => ( {
    setDate( val ) {
      dispatch( 'core/editor' )
        .editPost(
          { meta: { [metaValue]: val } },
        );
    },
  } ) ),
  withSelect( ( select, { metaValue } ) => ( {
    date: select( 'core/editor' )
      .getEditedPostAttribute( 'meta' )[metaValue],
  } ) ),
)( ( { date, setDate } ) => (
  <DateTimePicker
    currentDate={ date }
    is12Hour
    onChange={ d => setDate( d ) }
  />
) );

export default MetaDateTimePicker;
