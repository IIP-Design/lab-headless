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
   * Initialize all custom post types registered by plugin.
   *
   * @since 0.0.1
   */
  public function register_custom_post_types() {
    // Load in documentation custom post type.
    include_once GUILLOTINE_DIR . 'custom-post-types/docs/class-docs-cpt.php';
    $docs = new Docs_CPT();

    $docs->register_docs_cpt();
  }

  /**
   * Initialize all custom primitive types on which more complex types depend in the GraphQL API.
   * Complex types include unions and custom post types.
   *
   * @since 0.0.1
   */
  public function register_custom_graphql_primitives() {
    // Load in Types class in order to register custom types.
    include_once GUILLOTINE_DIR . 'graphql/class-types.php';
    $types = new Types();

    $types->register_styled_block_meta_types();
  }

  /**
   * Initialize all custom union types in the GraphQL API.
   *
   * @param array $type_registry  List of available types.
   *
   * @since 0.0.1
   */
  public function register_custom_graphql_unions( $type_registry ) {
    // Load in Types class in order to register custom types.
    include_once GUILLOTINE_DIR . 'graphql/class-types.php';
    $types = new Types();

    $types->register_styled_blocks_union( $type_registry );
  }

  /**
   * Initialize all custom metadata fields in the GraphQL API.
   *
   * @since 0.0.1
   */
  public function register_custom_graphql_types() {
    // Load in documentation custom post type.
    include_once GUILLOTINE_DIR . 'custom-post-types/docs/class-docs-cpt.php';
    $docs = new Docs_CPT();

    // Load in Fields class in order to register miscellaneous fields.
    include_once GUILLOTINE_DIR . 'graphql/class-fields.php';
    $fields = new Fields();

    // Load in Types class in order to register custom types.
    include_once GUILLOTINE_DIR . 'graphql/class-types.php';
    $types = new Types();

    // Documentation page custom post type.
    $docs->register_docs_graphql();

    // Styled Block Builder compatibility types.
    $types->register_styled_block_type();
    $fields->register_style_blocks_graphql();
  }

  /**
   * Register the JavaScript required for customizations of the Gutenberg Editor.
   *
   * @since 0.0.1
   */
  public function register_gutenberg_plugins() {
    // Adds a documentation sidebar to the Gutenberg documents panel.
    $script_asset = require GUILLOTINE_DIR . $this->build_dir . '/gpalab-docs-sidebar.asset.php';

    wp_register_script(
      'docs-sidebar-js',
      GUILLOTINE_URL . $this->build_dir . '/gpalab-docs-sidebar.js',
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
