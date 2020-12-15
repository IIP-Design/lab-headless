import { render } from '@wordpress/element';
import AddToCalendar from 'react-add-to-calendar';

import { i18nize } from '../../../js/shared/utils/helpers';

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
        endTime: gpalabEventMeta.endTime,
        startTime: gpalabEventMeta.startTime,
        title: gpalabEventMeta.title,
      } }
      listItems={ [
        { apple: 'Apple Calendar' }, { google: 'Google' }, { outlook: 'Outlook' },
      ] }
    />,
    attachTo,
  );
}
