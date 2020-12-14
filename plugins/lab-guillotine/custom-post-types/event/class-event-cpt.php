<?php
/**
 * Registers the Event_CPT class.
 *
 * @package Guillotine\Event_CPT
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register a event page custom post type.
 *
 * @package Guillotine\Event_CPT
 * @since 0.0.1
 */
class Event_CPT {
  /**
   * Register the events page custom post type.
   *
   * @since 0.0.1
   */
  public function register_event_cpt() {
    // $capabilities = array(
    // 'edit_posts'             => 'edit_docs',
    // 'edit_others_posts'      => 'edit_others_docs',
    // 'edit_private_posts'     => 'edit_private_docs',
    // 'edit_published_posts'   => 'edit_published_docs',
    // 'delete_posts'           => 'delete_docs',
    // 'delete_others_posts'    => 'delete_others_docs',
    // 'delete_private_posts'   => 'delete_private_docs',
    // 'delete_published_posts' => 'delete_published_docs',
    // 'read_private_posts'     => 'read_private_docs',
    // 'publish_posts'          => 'delete_docs',
    // );

    $labels = array(
      'name'                     => _x( 'Events', 'General name for the event post type', 'gpalab-guillotine' ),
      'singular_name'            => _x( 'Event Page', 'Name one instance of event post type', 'gpalab-guillotine' ),
      'add_new'                  => _x( 'Add New Event', 'Event post type', 'gpalab-guillotine' ),
      'add_new_item'             => _x( 'Add New Event', 'For adding a singular Event page', 'gpalab-guillotine' ),
      'all_items'                => __( 'All Events', 'gpalab-guillotine' ),
      'archives'                 => __( 'Event Archives', 'gpalab-guillotine' ),
      'attributes'               => __( 'Event Attributes', 'gpalab-guillotine' ),
      'edit_item'                => __( 'Edit Events', 'gpalab-guillotine' ),
      'filter_items_list'        => __( 'Filter event list', 'gpalab-guillotine' ),
      'insert_into_item'         => __( 'Insert into Event', 'gpalab-guillotine' ),
      'item_published'           => __( 'Event published.', 'gpalab-guillotine' ),
      'item_published_privately' => __( 'Event published privately.', 'gpalab-guillotine' ),
      'item_reverted_to_draft'   => __( 'Event reverted to draft.', 'gpalab-guillotine' ),
      'item_scheduled'           => __( 'Event scheduled for publication.', 'gpalab-guillotine' ),
      'item_updated'             => __( 'Event updated.', 'gpalab-guillotine' ),
      'items_list'               => __( 'Event list', 'gpalab-guillotine' ),
      'items_list_navigation'    => __( 'Event list navigation', 'gpalab-guillotine' ),
      'menu_name'                => _x( 'Events', 'Name in admin menu for the event post type', 'gpalab-guillotine' ),
      'new_item'                 => __( 'New Events', 'gpalab-guillotine' ),
      'not_found'                => __( 'No events found', 'gpalab-guillotine' ),
      'not_found_in_trash'       => __( 'No events found in Trash', 'gpalab-guillotine' ),
      'search_items'             => __( 'Search Events', 'gpalab-guillotine' ),
      'uploaded_to_this_item'    => __( 'Uploaded to event', 'gpalab-guillotine' ),
      'view_item'                => __( 'View Event', 'gpalab-guillotine' ),
      'view_items'               => __( 'View Event Pages', 'gpalab-guillotine' ),
    );

    $rewrite = array(
      'feeds'      => true,
      'pages'      => true,
      'slug'       => 'gpalab_event',
      'with_front' => true,
    );

    $supports = array( 'author', 'custom-fields', 'editor', 'excerpt', 'revisions', 'thumbnail', 'title' );

    $args = array(
      'can_export'            => true,
      'capability_type'       => 'gpalab_event',
      // 'capabilities'          => $capabilities,
      'delete_with_user'      => true,
      'exclude_from_search'   => false,
      'description'           => __( 'Post team events', 'gpalab-guillotine' ),
      'has_archive'           => true,
      'hierarchical'          => false,
      'labels'                => $labels,
      'map_meta_cap'          => true,
      'menu_icon'             => 'dashicons-calendar-alt',
      'menu_position'         => null,
      'public'                => true,
      'publicly_queryable'    => true,
      'query_var'             => 'gpalab_event',
      'register_meta_box_cb'  => null,
      'rest_base'             => 'gpalab_event',
      'rest_controller_class' => 'WP_REST_Posts_Controller',
      'rewrite'               => $rewrite,
      'show_ui'               => true,
      'show_in_admin_bar'     => true,
      'show_in_menu'          => true,
      'show_in_nav_menus'     => true,
      'show_in_rest'          => true,
      'supports'              => $supports,
      'taxonomies'            => array(),
    );

    register_post_type( 'gpalab_event', $args );

    $this->register_event_meta();
  }

  /**
   * Register the metadata fields for the event custom post type.
   *
   * @since 0.0.1
   */
  private function register_event_meta() {
    register_post_meta(
      'gpalab_event',
      '_gpalab_event_date',
      array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
      )
    );
  }

  /**
   * Register the JavaScript required for customizations of the Gutenberg Editor.
   *
   * @since 0.0.1
   */
  public function register_event_gutenberg_plugin() {
    // Adds a sidebar to the Gutenberg documents panel for adding event .
    $script_asset = require GUILLOTINE_DIR . 'build/gpalab-event-sidebar.asset.php';

    wp_register_script(
      'gpalab-event-sidebar-js',
      GUILLOTINE_URL . 'build/gpalab-event-sidebar.js',
      $script_asset['dependencies'],
      $script_asset['version'],
      true
    );
  }

  /**
   * Enqueue event custom sidebar on the event custom post type admin page.
   *
   * @param string $hook_suffix  The current admin page.
   *
   * @since 0.0.1
   */
  public function enqueue_event_sidebar( $hook_suffix ) {
    $cpt = 'gpalab_event';

    if ( in_array( $hook_suffix, array( 'post.php', 'post-new.php' ), true ) ) {
      $screen = get_current_screen();

      if ( is_object( $screen ) && $cpt === $screen->post_type ) {
        wp_enqueue_script( 'gpalab-event-sidebar-js' );
      }
    }
  }
}
