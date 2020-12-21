import { render } from '@wordpress/element';
import AddToCalendar from 'react-add-to-calendar';

import { i18nize } from '../../../js/shared/utils/helpers';
import { normalizeDateString } from './utils/normalize';

import './styles/add-to-calendar.scss';
import './styles/fontawesome.scss';

const { gpalabEventMeta } = window;

const attachTo = document.getElementById( 'gpalab-event-add-to-cal' );

if ( attachTo ) {
  render(
    <AddToCalendar
      buttonTemplate={ { 'calendar-plus-o': 'left' } }
      buttonLabel={ i18nize( 'Add to Calendar' ) }
      event={ {
        description: gpalabEventMeta.description || '',
        endTime: normalizeDateString( gpalabEventMeta.endTime, gpalabEventMeta.tz_offset ),
        startTime: normalizeDateString( gpalabEventMeta.startTime, gpalabEventMeta.tz_offset ),
        title: gpalabEventMeta.title || '',
      } }
      listItems={ [
        { apple: 'Apple Calendar' }, { google: 'Google' }, { outlook: 'Outlook' },
      ] }
    />,
    attachTo,
  );
}
