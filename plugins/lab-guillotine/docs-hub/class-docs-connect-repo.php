<?php
/**
 * Registers the Docs_Connect_Repo class.
 *
 * @package Guillotine\Docs_Connect_Repo
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Sets up the Documentation Hub connect a repo page.
 *
 * @package Guillotine\Docs_Connect_Repo
 * @since 0.0.1
 */
class Docs_Connect_Repo {

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
   * Add a sub-page to the Documentation Hub to the admin menu where users can connect new repos.
   *
   * @since 0.0.1
   */
  public function add_connect_repo_page() {
    add_submenu_page(
      'gpalab-docs-hub',
      __( 'Docs Hub | Connect Repo', 'gpalab-guillotine' ),
      __( 'Connect Repo', 'gpalab-guillotine' ),
      'manage_options',
      'gpalab-connect-repo',
      function() {
        return $this->populate_connect_repo_page();
      },
      null
    );
  }

  /**
   * Render the markup for the Connect a Repo page.
   *
   * @since 0.0.1
   */
  private function populate_connect_repo_page() {
    ?>
    <div class="wrap">
      <h1><?php esc_html_e( 'Connect a New GitHub Repo', 'gpalab-guillotine' ); ?></h1>
      <p>
        <?php
        esc_html_e(
          'Use the wizard below to search a GitHub repo for documentation files and add them to the docs site.',
          'gpalab-guillotine'
        );
        ?>
      </p>
      <div id="gpalab-docs-hub" style="margin:1rem 0rem;"></div>
    </div>
    <?php
  }

    /**
     * Register the JavaScript and CSS bundles used to run the Connect a Repo Docs Hub page.
     *
     * @since 0.0.1
     */
  public function register_connect_repo_scripts() {
    $script_asset = require GUILLOTINE_DIR . 'build/connect-repo.asset.php';

    wp_register_script(
      'gpalab-guillotine-connect-repo-js',
      GUILLOTINE_URL . 'build/connect-repo.js',
      $script_asset['dependencies'],
      $script_asset['version'],
      true
    );

    wp_register_style(
      'gpalab-guillotine-connect-repo-css',
      GUILLOTINE_URL . 'build/connect-repo.css',
      array(),
      $this->version
    );
  }

  /**
   * Enqueue the connect-repo Javascript and CSS bundles if on the Connect a Repo page.
   *
   * @param string $hook   Name of the current page.
   *
   * @since 0.0.1
   */
  public function enqueue_connect_repo( $hook ) {
    if ( 'docs-hub_page_gpalab-connect-repo' !== $hook ) {
      return;
    }

    wp_localize_script(
      'gpalab-guillotine-connect-repo-js',
      'gpalabDocsHub',
      array(
        'githubDefaultOrg' => get_option( 'gpalab_guillotine_docs_org' ),
        'githubToken'      => get_option( 'gpalab_guillotine_docs_token' ),
      )
    );

    wp_enqueue_script( 'gpalab-guillotine-connect-repo-js' );
    wp_enqueue_style( 'gpalab-guillotine-connect-repo-css' );
  }
}
