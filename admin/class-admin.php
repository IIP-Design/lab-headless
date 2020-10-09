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

}
