<?php
/**
 * Registers the Database class.
 *
 * @package Guillotine\Database
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Sets up the Documentation Hub settings configuration page.
 *
 * @package Guillotine\Database
 * @since 0.0.1
 */
class Database {

  /**
   * Set the DB schema used by the current version of the plugin.
   *
   * @var int $db_version
   *
   * @access protected
   * @since 0.0.1
   */
  protected $schema_version;

  /**
   * Initializes the class with the plugin name and version.
   *
   * @param string $plugin     The plugin name.
   * @param string $version    The plugin version number.
   *
   * @since 0.0.1
   */
  public function __construct( $plugin, $version ) {
    $this->plugin         = $plugin;
    $this->version        = $version;
    $this->schema_version = 1;
  }

  /**
   * Initialize the docs-hub database.
   *
   * @since 0.0.1
   */
  public function create_docs_table() {
    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();

    $table_name = $wpdb->prefix . 'gpalab_docs_hub';

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
      page_id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
      page_content longtext,
      page_name varchar(255) NOT NULL,
      page_oid varchar(255) NOT NULL,
      page_path varchar(255) NOT NULL,
      parent varchar(255) NOT NULL,
      created_at datetime NOT NULL,
      included boolean NOT NULL,
      PRIMARY KEY (page_id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';

    dbDelta( $sql );

    // Save the current doc hub db schema version in sitemeta.
    update_site_option( 'gpalab_guillotine_docs_hub_schema', $this->schema_version );
  }
}
