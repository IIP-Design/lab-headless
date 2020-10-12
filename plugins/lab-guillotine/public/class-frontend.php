<?php
/**
 * Registers the Frontend class.
 *
 * @package Guillotine\Frontend
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Add plugin's frontend scripts and styles.
 *
 * @package Guillotine\Frontend
 * @since 0.0.1
 */
class Frontend {

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

  // INSERT YOUR FRONTEND FUNCTIONS HERE.

}
