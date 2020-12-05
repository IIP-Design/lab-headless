<?php
/**
 * Registers the Docs_Settings class.
 *
 * @package Guillotine\Docs_Settings
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Initialize admin hooks.
 *
 * @package Guillotine\Docs_Settings
 * @since 0.0.1
 */
class Docs_Settings {
  /**
   * Add a page for the Documentation Hub to the admin menu.
   *
   * @since 0.0.1
   */
  public function add_docs_hub_page() {
    add_menu_page(
      'gpalab-docs-hub',
      __( 'Docs Hub', 'gpalab-guillotine' ),
      'manage_options',
      'gpalab-docs-hub',
      function() {
        return $this->populate_docs_hub_page();
      },
      'dashicons-rest-api',
      null
    );
  }

  /**
   * Render the markup for the Documentation Hub page.
   *
   * @since 0.0.1
   */
  private function populate_docs_hub_page() {
    ?>
    <div class="wrap">
      <h1><?php esc_html_e( 'Documentation Hub', 'gpalab-guillotine' ); ?></h1>
      <form method="post" action="options.php">
      <?php
        settings_fields( 'gpalab_guillotine_docs_hub' );
        do_settings_sections( 'gpalab-docs-hub' );
        submit_button();
      ?>
      </form>
      <hr>
      <div id="gpalab-docs-hub">Docs Go Here</div>
    </div>
    <?php
  }

  /**
   * Register the plugin settings and add to the settings page.
   */
  public function populate_docs_settings() {
    register_setting(
      'gpalab_guillotine_docs_hub',
      'gpalab_guillotine_docs_org'
    );

    register_setting(
      'gpalab_guillotine_docs_hub',
      'gpalab_guillotine_docs_token'
    );

    /**
     * Add Documentation Hub settings section.
     */
    add_settings_section(
      'gpalab-guillotine-docs-settings',
      __( 'Configure documentation settings', 'gpalab-guillotine' ),
      function() {
        esc_html_e( 'This setting will apply the font styles used by state.gov to all block heading elements. If left disabled, blocks will inherit the base heading styles on the site.', 'gpalab-guillotine' );
      },
      'gpalab-docs-hub'
    );

    add_settings_field(
      'gpalab-guillotine-docs-org',
      __( 'Default GitHub organization', 'gpalab-guillotine' ),
      function() {
        $label = __( 'Set repo owner', 'gpalab-guillotine' );
        $org   = get_option( 'gpalab_guillotine_docs_org', '' );

        echo '<label for="gpalab-guillotine-docs-org">' . esc_html( $label ) . ': <input id="gpalab-guillotine-docs-org" name="gpalab_guillotine_docs_org" value="' . esc_html( $org ) . '" type="text" /></label>';
      },
      'gpalab-docs-hub',
      'gpalab-guillotine-docs-settings'
    );

    add_settings_field(
      'gpalab-guillotine-docs-token',
      __( 'GitHub access token', 'gpalab-guillotine' ),
      function() {
        $label = __( 'Add token', 'gpalab-guillotine' );
        $token = get_option( 'gpalab_guillotine_docs_token', '' );

        echo '<label for="gpalab-guillotine-docs-token">' . esc_html( $label ) . ': <input id="gpalab-guillotine-docs-token" name="gpalab_guillotine_docs_token" value="' . esc_html( $token ) . '" type="password" /></label>';
      },
      'gpalab-docs-hub',
      'gpalab-guillotine-docs-settings'
    );
  }
}
