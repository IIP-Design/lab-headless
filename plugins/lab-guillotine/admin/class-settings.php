<?php
/**
 * Registers the Settings class.
 *
 * @package Guillotine\Settings
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Add settings page to manage the plugin.
 *
 * @package Guillotine\Settings
 * @since 0.0.1
 */
class Settings {

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
   * Adds a settings page to social links sub-menu where the plugin can be configured.
   *
   * @since 0.0.1
   */
  public function add_settings_page() {
    add_menu_page(
      __( 'Guillotine | Settings', 'gpalab-guillotine' ),
      __( 'Guillotine', 'gpalab-guillotine' ),
      'manage_options',
      'gpalab-guillotine-settings',
      function() {
        return $this->create_settings_page();
      },
      $this->get_guillotine_icon(),
      null
    );
  }

  /**
   * Render the markup for the plugin settings page.
   *
   * @since 0.0.1
   */
  private function create_settings_page() {
    ?>
    <div class="wrap">
      <h1><?php esc_html_e( 'Configure Guillotine', 'gpalab-guillotine' ); ?></h1>
      <form method="post" action="options.php">
      <?php
        settings_fields( 'guillotine_settings' );
        do_settings_sections( 'gpalab-guillotine-settings' );
        submit_button();
      ?>
      </form>
    </div>
    <?php
  }

  /**
   * Register the plugin settings and add to the settings page.
   *
   * @since 0.0.1
   */
  public function populate_guillotine_settings() {
    register_setting(
      'guillotine_settings',
      'gpalab_guillotine'
    );

    // Put shared strings in the parent function scope so that it isn't translated multiple times.
    $label = __( 'Enable', 'gpalab-guillotine' );

    // Plugin's feature toggles.
    add_settings_section(
      'guillotine-settings',
      __( 'Select features to enable', 'gpalab-guillotine' ),
      function() {
        esc_html_e( 'Use the below checkboxes to select the desired plugin features.', 'gpalab-guillotine' );
      },
      'gpalab-guillotine-settings'
    );

    add_settings_field(
      'gpalab-guillotine-block-manager',
      __( 'Block manager', 'gpalab-guillotine' ),
      function() use ( $label ) {
        $block_man = get_option( 'gpalab_guillotine' );
        $checked   = $block_man['block_manager'] ? 'checked ' : '';

        ?>
        <label for="gpalab-guillotine-block-manager" class="gpalab-docs-hub-label">
          <?php echo esc_html( $label ) . ': '; ?>
          <input
            id="gpalab-guillotine-block-manager"
            name="gpalab_guillotine[block_manager]"
            <?php echo esc_html( $checked ); ?>
            type="checkbox"
          />
        </label>
        <?php
      },
      'gpalab-guillotine-settings',
      'guillotine-settings'
    );

    add_settings_field(
      'gpalab-guillotine-docs-hub',
      __( 'Documentation Hub', 'gpalab-guillotine' ),
      function() use ( $label ) {
        $docs_hub = get_option( 'gpalab_guillotine' );
        $checked  = $docs_hub['docs_hub'] ? 'checked ' : '';

        ?>
        <label for="gpalab-guillotine-docs-hub">
          <?php echo esc_html( $label ) . ': '; ?>
          <input
            id="gpalab-guillotine-docs-hub"
            name="gpalab_guillotine[docs_hub]"
            <?php echo esc_html( $checked ); ?>
            type="checkbox"
          />
          </label>
        <?php
      },
      'gpalab-guillotine-settings',
      'guillotine-settings'
    );

    // Development tools.
    add_settings_section(
      'guillotine-development',
      __( 'Development Tools', 'gpalab-guillotine' ),
      function() {
        ?>
        <p>
          <?php esc_html_e( 'Use the below settings to configure the plugin for development.', 'gpalab-guillotine' ); ?>
        </p>
        <p>
          <strong><?php esc_html_e( 'WARNING: ', 'gpalab-guillotine' ); ?></strong>
          <?php esc_html_e( 'These settings can break the functionality of the site. They should only be used while actively developing the plugin.', 'gpalab-guillotine' ); ?>
        </p>
        <?php
      },
      'gpalab-guillotine-settings'
    );

    add_settings_field(
      'gpalab-guillotine-dev-builds',
      __( 'Use Development Builds', 'gpalab-guillotine' ),
      function() use ( $label ) {
        $block_man = get_option( 'gpalab_guillotine' );
        $checked   = $block_man['dev_build'] ? 'checked ' : '';

        ?>
        <label for="gpalab-guillotine-dev-builds" class="gpalab-docs-hub-label">
          <?php echo esc_html( $label ) . ': '; ?>
          <input
            id="gpalab-guillotine-dev-builds"
            name="gpalab_guillotine[dev_build]"
            <?php echo esc_html( $checked ); ?>
            type="checkbox"
          />
        </label>
        <?php
      },
      'gpalab-guillotine-settings',
      'guillotine-development'
    );
  }

  /**
   * Check for docs hub table in the db when enabling the docs hub.
   * If this table does not exist, create it.
   *
   * @param mixed $old_value  Previous value of the gpalab_guillotine option.
   * @param mixed $value      New value for the gpalab_guillotine option.
   *
   * @since 0.0.1
   */
  public function initialize_docs_table( $old_value, $value ) {
    global $wpdb;

    // Only run initialization if docs hub is enabled.
    if ( 'on' !== $value['docs_hub'] ) {
      return;
    }

    $table_name = $wpdb->prefix . 'gpalab_docs_hub';

    // Run create db function only if table does not already exist.
    if ( $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table_name ) ) !== $table_name ) {
      require_once GUILLOTINE_DIR . 'docs-hub/class-database.php';

      $db = new Database( $this->plugin, $this->version );
      $db->create_docs_table();
    }
  }

  /**
   * Return the guillotine icon as a data url.
   *
   * @return string  The base64 encoded value of the Guillotine icon.
   *
   * @since 0.0.1
   */
  private function get_guillotine_icon() {
    // phpcs:disable WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
    // phpcs:disable WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
    $svg  = file_get_contents( GUILLOTINE_DIR . 'assets/blade.svg' );
    $icon = 'data:image/svg+xml;base64,' . base64_encode( $svg );
    // phpcs:enable

    return $icon;
  }
}
