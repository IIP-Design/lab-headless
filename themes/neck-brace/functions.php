<?php
/**
 * Neck Brace theme functions and definitions
 *
 * @package GPALAB_Headless
 * @subpackage Neck_Brace
 *
 * @since 1.0.0
 */

/**
 * Defines the current theme version.
 *
 * @var string $neck_brace_version   The current theme version number.
 *
 * @since 1.0.0
 */
$neck_brace_version = '1.0.0';

/**
 * Enqueues the theme's minimal stylesheet.
 *
 * @since 1.0.0
 */
function enqueue_neck_brace() {
  global $neck_brace_version;

  wp_enqueue_style(
    'ichabod-styles',
    get_template_directory_uri() . '/style.css',
    array(),
    $neck_brace_version,
    'all'
  );
}

/**
 * All theme actions.
 */
add_action( 'wp_enqueue_scripts', 'enqueue_neck_brace' );
