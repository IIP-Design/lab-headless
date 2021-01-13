import propTypes from 'prop-types';
import { registerBlockType } from '@wordpress/blocks';

import { i18nize } from 'shared/utils/helpers';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';

/**
 * Internal dependencies
 */
import attributes from './src/attributes';
import SpeakerBio from './src/save';
import SpeakerBioEditor from './src/editor';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'gpalab-guillotine/speaker-bio', {
  title: i18nize( 'Speaker Bio' ),
  description: i18nize( 'Block to add a speaker\'s biographic information' ),
  category: 'widgets',
  icon: 'admin-users',
  supports: {
    html: false, // Removes support for an HTML mode.
  },
  attributes,
  edit( { attributes, setAttributes } ) {
    const { bio, name, title } = attributes;

    const updateValue = e => {
      setAttributes( {
        [e.target.name]: e.target.value,
      } );
    };

    return <SpeakerBioEditor bio={ bio } name={ name } title={ title } updateValue={ updateValue } />;
  },
  save( props ) {
    console.log( props );

    return <SpeakerBio props={ props } />;
  },
} );
