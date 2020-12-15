<?php
/**
 * Registers the Activator class.
 *
 * @package Guillotine\Activator
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register all hooks to be run when the plugin is activated.
 *
 * @package Guillotine/Activator
 * @since 0.0.1
 */
class Activator {

  /**
   * Run all actions required to start using the plugin.
   *
   * @since 0.0.1
   */
  public function activate() {

    // Ensure user has the proper permissions.
    if ( ! current_user_can( 'activate_plugins' ) ) {
      return;
    }

    self::initialize_options();
    self::add_capabilities();
  }

  /**
   * Add the plugin's default options values to the options table in the database.
   *
   * @since 0.0.1
   */
  private static function initialize_options() {
    add_option( 'gpalab_guillotine_block_manager', 0 );
    add_option( 'gpalab_guillotine_docs_hub', 0 );
  }

  /**
   * Add a custom capabilities which permits a user to access certain plugin actions.
   *
   * @since 0.0.1
   */
  private static function add_capabilities() {
    $default_editor_cap = 'edit_posts';
    $grant              = true;

    $editable = get_editable_roles();

    // Iterate through all roles, and add custom capabilities to each role that has the default minimum capability.
    foreach ( wp_roles()->role_objects as $key => $role ) {
      // Grant social event permissions to editor users.
      if ( isset( $editable[ $key ] ) && $role->has_cap( $default_editor_cap ) ) {
        $role->add_cap( 'gpalab_edit_events', $grant );
        $role->add_cap( 'gpalab_edit_others_events', $grant );
        $role->add_cap( 'gpalab_edit_published_events', $grant );
        $role->add_cap( 'gpalab_delete_events', $grant );
        $role->add_cap( 'gpalab_delete_others_events', $grant );
        $role->add_cap( 'gpalab_delete_published_events', $grant );
        $role->add_cap( 'gpalab_publish_events', $grant );
        $role->add_cap( 'gpalab_read_private_events', $grant );
        $role->add_cap( 'gpalab_edit_private_events', $grant );
        $role->add_cap( 'gpalab_delete_private_events', $grant );
      }
    }

    unset( $role );
  }
}
