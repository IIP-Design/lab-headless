<?php
/**
 * Registers the Admin class.
 *
 * @package Guillotine\Admin
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Initialize admin hooks.
 *
 * @package Guillotine\Admin
 * @since 0.0.1
 */
class Admin {

  /**
   * Initializes the class with the plugin name and version.
   *
   * @param string $plugin     The plugin name.
   * @param string $version    The plugin version number.
   *
   * @since 0.0.1
   */
  public function __construct( $plugin, $version ) {
    $this->plugin  = $plugin;
    $this->version = $version;
  }

  /**
   * Initialize all custom post types registered by plugin.
   *
   * @since 0.0.1
   */
  public function register_custom_post_types() {
    // Load in documentation custom post type.
    include_once GUILLOTINE_DIR . 'admin/post-types/class-docs-cpt.php';
    $docs = new Docs_CPT();

    $docs->register_docs_cpt();
  }

  /**
   * Initialize all custom metadata fields in the GraphQL API.
   *
   * @since 0.0.1
   */
  public function register_custom_graphql_types() {
    // Load in documentation custom post type.
    include_once GUILLOTINE_DIR . 'admin/post-types/class-docs-cpt.php';
    $docs = new Docs_CPT();

    $docs->register_docs_graphql();
  }

  /**
   * Register the JavaScript required for customizations of the Gutenberg Editor.
   *
   * @since 0.0.1
   */
  public function register_gutenberg_plugins() {
    // Adds a documentation sidebar to the Gutenberg documents panel.
    $script_asset = require GUILLOTINE_ADMIN_BUILD_DIR . 'docs-sidebar.asset.php';

    wp_register_script(
      'docs-sidebar-js',
      GUILLOTINE_ADMIN_BUILD_URL . 'docs-sidebar.js',
      $script_asset['dependencies'],
      $script_asset['version'],
      true
    );
  }

  /**
   * Enqueue docs custom sidebar on the docs custom post type admin page.
   *
   * @param string $hook_suffix    The current admin page.
   *
   * @since 0.0.1
   */
  public function enqueue_docs_sidebar( $hook_suffix ) {
    $cpt = 'gpalab-docs';

    if ( in_array( $hook_suffix, array( 'post.php', 'post-new.php' ), true ) ) {
      $screen = get_current_screen();

      if ( is_object( $screen ) && $cpt === $screen->post_type ) {
        wp_enqueue_script( 'docs-sidebar-js' );
      }
    }
  }
}
