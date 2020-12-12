<?php
/**
 * Registers the Event_Front class.
 *
 * @package Guillotine\Event_Front
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register a event page custom post type.
 *
 * @package Guillotine\Event_Front
 * @since 0.0.1
 */
class Event_Front {
  /**
   * If the post is a lab event, replace the default template with the event template.
   *
   * @param string $template  Path to the default template file.
   * @return string           Path to the template file.
   *
   * @since 0.0.1
   */
  public function include_event_single( $template ) {

    if ( 'gpalab_event' === get_post_type() ) {

      if ( is_single() ) {
        $theme_file = locate_template( array( 'single-gpalab_event.php' ) );

        if ( $theme_file ) {
          $template = $theme_file;
        } else {
          $template = GUILLOTINE_DIR . 'custom-post-types/event/single-gpalab_event.php';
        }
      }
    }

    return $template;
  }
}
