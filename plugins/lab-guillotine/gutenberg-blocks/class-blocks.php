<?php
/**
 * Registers the Blocks class.
 *
 * @package Guillotine\Blocks
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register .
 *
 * @package Guillotine\Blocks
 * @since 0.0.1
 */
class Blocks {

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
   * Register the custom blocks.
   *
   * @since 0.0.1
   */
  public function register_custom_blocks() {
    $script_asset = require GUILLOTINE_DIR . 'build/gpalab-blocks.asset.php';

    wp_register_script(
      'gpalab-guillotine-blocks-js',
      GUILLOTINE_URL . 'build/gpalab-blocks.js',
      $script_asset['dependencies'],
      $script_asset['version'],
      true
    );

    wp_register_style(
      'gpalab-guillotine-blocks-css',
      GUILLOTINE_URL . 'build/gpalab-blocks.css',
      array(),
      $this->version
    );

    register_block_type(
      'gpalab-guillotine/gpalab-blocks',
      array(
        'editor_script' => 'gpalab-guillotine-blocks-js',
        'style'         => 'gpalab-guillotine-blocks-css',
      )
    );
  }
}
