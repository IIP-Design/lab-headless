<?php
/**
 * Renders an add to calendar widget.
 *
 * @package GPALAB_Headless
 * @subpackage Neck_Brace
 * @since 0.0.1
 */

if ( ! empty( $date ) ) {
  $date_format = get_option( 'date_format' );
  $time_format = get_option( 'time_format' );
  $format      = $date_format . ' ' . $time_format . ' T';

  $formatted = date_i18n( $format, strtotime( $date ) );
  echo '<p>' . esc_html( $formatted ) . '<p>';

  // if ( $date > gmdate( 'Y-m-dTH:i:s' ) ) {
  // echo '<div class="gpalab-add-to-cal-container"><div class="gpalab-event-add-to-cal" id="gpalab-event-add-to-cal"></div></div>';
  // }
}
