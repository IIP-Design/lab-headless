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
    * Initializes the class with the plugin name and version.
    *
    * @param string $plugin     The plugin name.
    * @param string $version    The plugin version number.
    * @param string $build_dir  The name of the build directory.
    *
    * @since 0.0.1
    */
  public function __construct( $plugin, $version, $build_dir ) {
    $this->build_dir = $build_dir;
    $this->plugin    = $plugin;
    $this->version   = $version;
  }

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

  /**
   * Registers the JavaScript and CSS bundles used on the frontend of the event post type.
   *
   * @since 0.0.1
   */
  public function enqueue_events_frontend() {
    global $post;

    $cpt = 'gpalab_event';

    if ( ! is_admin() && get_post_type() === $cpt ) {
      $script_asset = require GUILLOTINE_DIR . $this->build_dir . '/gpalab-event.asset.php';

      // Register the stylesheets for the frontend.
      wp_enqueue_style(
        'gpalab-event-front-css',
        GUILLOTINE_URL . $this->build_dir . '/gpalab-event.css',
        array(),
        $this->version
      );

      // Enqueue frontend JavaScript bundle.
      wp_enqueue_script(
        'gpalab-event-frontend-js',
        GUILLOTINE_URL . $this->build_dir . '/gpalab-event.js',
        $script_asset['dependencies'],
        $script_asset['version'],
        true
      );

      // Pass PHP variable to frontend JS.

      $event_date = get_post_meta( $post->ID, '_gpalab_event_date', true );
      $excerpt    = get_the_excerpt( $post->ID );
      $duration   = get_post_meta( $post->ID, '_gpalab_event_duration', true );
      $dur_offset = isset( $duration ) ? intval( $duration ) * 60 : 0;
      $event_end  = date_i18n( 'Y-m-d\TH:i:s', strtotime( $event_date ) + $dur_offset );
      $gmt_offset = get_option( 'gmt_offset' );

      wp_localize_script(
        'gpalab-event-frontend-js',
        'gpalabEventMeta',
        array(
          'description' => $excerpt,
          'startTime'   => $event_date,
          'endTime'     => $event_end,
          'title'       => get_the_title( $post->ID ),
          'tz_offset'   => $gmt_offset,
        )
      );
    }
  }

  /**
   * Adds the overlay-header class to the body of the event post type.
   *
   * @param array $classes   List of classes to be added to the page's body tag.
   * @return array           List of classes with the overlay-header class added.
   *
   * @since 0.0.1
   */
  public function append_overlay_class( $classes ) {

    $classes[] = 'overlay-header';

    return $classes;
  }
}
