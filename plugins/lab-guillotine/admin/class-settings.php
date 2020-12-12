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
      'gpalab_guillotine_block_manager'
    );

    register_setting(
      'guillotine_settings',
      'gpalab_guillotine_docs_hub'
    );

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
      function() {
        $label     = __( 'Enable', 'gpalab-guillotine' );
        $block_man = get_option( 'gpalab_guillotine_block_manager' );
        $checked   = $block_man ? 'checked ' : '';

        echo '<label for="gpalab-guillotine-block-manager" class="gpalab-docs-hub-label">' . esc_html( $label ) . ': <input id="gpalab-guillotine-block-manager" name="gpalab_guillotine_block_manager" ' . esc_html( $checked ) . 'type="checkbox" /></label>';
      },
      'gpalab-guillotine-settings',
      'guillotine-settings'
    );

    add_settings_field(
      'gpalab-guillotine-docs-hub',
      __( 'Documentation Hub', 'gpalab-guillotine' ),
      function() {
        $label    = __( 'Enable', 'gpalab-guillotine' );
        $docs_hub = get_option( 'gpalab_guillotine_docs_hub' );
        $checked  = $docs_hub ? 'checked ' : '';

        echo '<label for="gpalab-guillotine-docs-hub">' . esc_html( $label ) . ': <input id="gpalab-guillotine-docs-hub" name="gpalab_guillotine_docs_hub" ' . esc_html( $checked ) . 'type="checkbox" /></label>';
      },
      'gpalab-guillotine-settings',
      'guillotine-settings'
    );
  }

  /**
   * Return the guillotine icon as a data url.
   *
   * @return string
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
