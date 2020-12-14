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
 * Sets the default color palette and homepage settings when the theme is activated.
 *
 * @since 0.0.1
 */
function neck_brace_theme_settings() {
  add_theme_support(
    'custom-background',
    array(
      'default-color' => 'ffffff',
    )
  );

  $mods            = get_theme_mods();
  $accents         = $mods['accent_accessible_colors'];
  $author_bio      = $mods['show_author_bio'];
  $bkgrd_color     = $mods['background_color'];
  $head_foot_bkgrd = $mods['header_footer_background_color'];
  $header_search   = $mods['enable_header_search'];
  $overlay_bkgrd   = $mods['cover_template_overlay_background_color'];
  $overlay_text    = $mods['cover_template_overlay_text_color'];
  $overlay_opacity = $mods['cover_template_overlay_opacity'];

  if ( ! isset( $accents ) ) {
    set_theme_mod(
      'accent_accessible_colors',
      array(
        'content'       => array(
          'text'      => '#212121',
          'accent'    => '#0071a1',
          'secondary' => '#0071a1',
          'borders'   => '#0A2240',
        ),
        'header-footer' => array(
          'background' => '#0A2240',
          'text'       => '#FFFFFF',
          'accent'     => '#FFFFFF',
          'secondary'  => '#0071a1',
          'borders'    => '#0A2240',
        ),
      )
    );
  }

  if ( ! isset( $author_bio ) ) {
    set_theme_mod(
      'show_author_bio',
      false
    );
  }

  if ( ! isset( $bkgrd_color ) ) {
    set_theme_mod(
      'background_color',
      'FFFFFF'
    );
  }

  if ( empty( $head_foot_bkgrd ) ) {
    set_theme_mod(
      'header_footer_background_color',
      '#0A2240'
    );
  }

  if ( ! isset( $header_search ) ) {
    set_theme_mod(
      'enable_header_search',
      false
    );
  }

  if ( empty( $overlay_bkgrd ) ) {
    set_theme_mod(
      'cover_template_overlay_background_color',
      '#FFFFFF'
    );
  }

  if ( empty( $overlay_text ) ) {
    set_theme_mod(
      'cover_template_overlay_text_color',
      '#0A2240'
    );
  }

  if ( empty( $overlay_opacity ) ) {
    set_theme_mod(
      'cover_template_overlay_opacity',
      0
    );
  }
}

/**
 * All theme filters.
 */

 /**
 * All theme actions.
 */
add_action( 'wp_enqueue_scripts', 'enqueue_neck_brace' );
add_action( 'after_setup_theme', 'neck_brace_theme_settings' );
