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
   * Initialize all custom metadata fields in the GraphQL API.
   *
   * @since 0.0.1
   */
  public function register_custom_graphql_types() {
    // Load in documentation custom post type.
    // include_once GUILLOTINE_DIR . 'custom-post-types/docs/class-docs-cpt.php';
    // $docs = new Docs_CPT();

    // Documentation page custom post type.
    // $docs->register_docs_graphql();

    // Styled Block Builder compatibility.
    include_once GUILLOTINE_DIR . 'graphql/class-styled-blocks-gql.php';
    $styled_blocks = new Styled_Blocks_GQL();

    $styled_blocks->register_styled_blocks_gql();

    $enabled_features = get_option( 'gpalab_guillotine' );

    if ( ! empty( $enabled_features ) && ! empty( $enabled_features['docs_hub'] ) ) {
      // Load in Types class in order to register custom types.
      include_once GUILLOTINE_DIR . 'graphql/class-docs-hub-gql.php';
      $docs_hub = new Docs_Hub_GQL();

      $docs_hub->register_docs_hub_gql();
    }
  }

  /**
   * Initialize all custom union types in the GraphQL API.
   * Register after other types because unions build on more primitive types.
   *
   * @param array $type_registry  List of available types.
   *
   * @since 0.0.1
   */
  public function register_custom_graphql_unions( $type_registry ) {
    // Register union types for the styled block builder.
    include_once GUILLOTINE_DIR . 'graphql/unions/class-styled-blocks-unions.php';
    $styled_blocks = new Styled_Blocks_Unions();

    $styled_blocks->register_styled_blocks_union( $type_registry );
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
