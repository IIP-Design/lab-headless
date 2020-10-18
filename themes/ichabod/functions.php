<?php
/**
 * Ichabod functions and definitions
 *
 * @package GPALAB_Headless
 * @subpackage Ichabod
 *
 * @since 1.0.0
 */

/**
 * Defines the current theme version.
 *
 * @var string $ichabod_version   The current theme version number.
 *
 * @since 1.0.0
 */
$ichabod_version = '1.0.0';

/**
 * Adds a sub-menu page under a custom post type parent.
 *
 * @since 1.0.0
 */
function add_ichabod_settings_page() {
  add_submenu_page(
    'themes.php',
    __( 'Ichabod Theme Settings', 'gpalab-ichabod' ),
    __( 'Configure Ichabod', 'gpalab-ichabod' ),
    'manage_options',
    'gpalab-ichabod',
    'render_settings_page_content'
  );
}

/**
 * Display callback for the theme settings sub-menu page.
 *
 * @since 1.0.0
 */
function render_settings_page_content() {
  ?>
  <div class="wrap">
      <h1><?php esc_html_e( 'Ichabod Theme Settings', 'gpalab-ichabod' ); ?></h1>
      <form method="post" action="options.php">
      <?php
        settings_fields( 'gpalab-ichabod' );
        do_settings_sections( 'gpalab-ichabod' );
        submit_button();
      ?>
      </form>
  </div>
  <?php
}

/**
 * Register the theme settings and add to the settings page.
 *
 * @since 1.0.0
 */
function populate_ichabod_settings() {
    /**
     * Register settings
     */
    register_setting(
      'gpalab-ichabod',
      'gpalab-ichabod-redirect'
    );

    /**
     * Add custom styling section
     */
    add_settings_section(
      'gpalab-ichabod-redirect',
      __( 'Frontend Redirect URL', 'gpalab-ichabod' ),
      function() {
        esc_html_e( 'This setting will apply the font styles used by state.gov to all block heading elements. If left disabled, blocks will inherit the base heading styles on the site.', 'gpalab-blocks' );
      },
      'gpalab-ichabod'
    );

    add_settings_field(
      'gpalab-ichabod-redirect',
      __( 'Set the redirect URL:', 'gpalab-ichabod' ),
      function() {
        $value = get_option( 'gpalab-ichabod-redirect' );

        ?>
          <label for="gpalab-ichabod-redirect">
            <input
              id="gpalab-ichabod-redirect"
              name="gpalab-ichabod-redirect"
              style="margin-left: 10px; width: 40%"
              type="text"
              value="<?php echo esc_html( $value ); ?>"
            />
          </label>
        <?php
      },
      'gpalab-ichabod',
      'gpalab-ichabod-redirect'
    );
}

/**
 * Enqueues the theme's minimal stylesheet.
 *
 * @since 1.0.0
 */
function enqueue_ichabod() {
  global $ichabod_version;

  wp_enqueue_style(
    'ichabod-styles',
    get_template_directory_uri() . '/style.css',
    array(),
    $ichabod_version,
    'all'
  );
}

/**
 * Replace the 'Powered by WordPress' tagline in the admin footer with
 * a custom tagline on the theme settings page.
 *
 * @param string $text   The default text from the admin footer tagline.
 * @return string        The text for the admin footer tagline.
 *
 * @since 1.0.0
 */
function change_admin_footer_text( $text ) {
  if ( 'appearance_page_gpalab-ichabod' === get_current_screen()->base ) {

    $text = '"His appetite for the marvelous, and his powers of digesting it, were equally extraordinary."';
  }

  return $text;
}

/**
 * Replace the WordPress version in the admin footer with the theme version on the
 * theme settings page.
 *
 * @since 1.0.0
 */
function change_admin_footer_version() {
  global $ichabod_version;

  $theme_name = __( 'Ichabod Theme Version', 'gpalab-ichabod' );

  if ( 'appearance_page_gpalab-ichabod' === get_current_screen()->base ) {

    echo esc_html( $theme_name . ' ' . $ichabod_version );

  } else {

    echo esc_html( 'Version ' . get_bloginfo( 'version' ) );

  }
}

/**
 * Add support for featured images in posts and pages.
 *
 * @since 1.0.0
 */
add_theme_support(
  'post-thumbnails',
  array( 'page', 'post' )
);

/**
 * All theme filters.
 */
add_filter( 'admin_footer_text', 'change_admin_footer_text' );
add_filter( 'update_footer', 'change_admin_footer_version', 9999 );

/**
 * All theme actions.
 */
add_action( 'wp_enqueue_scripts', 'enqueue_ichabod' );
add_action( 'admin_menu', 'add_ichabod_settings_page' );
add_action( 'admin_init', 'populate_ichabod_settings' );
