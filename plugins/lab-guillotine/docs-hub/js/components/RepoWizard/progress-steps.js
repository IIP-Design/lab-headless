import { i18nize } from 'shared/utils/helpers';

export const steps = [
  { id: 'one', title: i18nize( 'Step One:' ), subtitle: i18nize( 'Set Repo Owner & Name' ) },
  { id: 'two', title: i18nize( 'Step Two:' ), subtitle: i18nize( 'Select Repo Branch' ) },
  { id: 'three', title: i18nize( 'Step Three:' ), subtitle: i18nize( 'Get File Tree' ) },
  { id: 'four', title: i18nize( 'Step Four:' ), subtitle: i18nize( 'Select Files to Include in Build' ) },
];
