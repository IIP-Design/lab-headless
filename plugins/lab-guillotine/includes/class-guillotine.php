<?php
/**
 * Registers the Guillotine class.
 *
 * @package Guillotine
 * @since 0.0.1
 */

 /**
  * Register all hooks to be run by the plugin.
  *
  * @package Guillotine
  */
class Guillotine {

  /**
   * The loader that's responsible for maintaining and registering all hooks that power the plugin.
   *
   * @var Guillotine_Loader $loader    Maintains and registers all hooks for the plugin.
   *
   * @access protected
   * @since 0.0.1
   */

  protected $loader;

  /**
   * The unique identifier and version of this plugin.
   *
   * @var string $plugin_name
   *
   * @access protected
   * @since 0.0.1
   */
  protected $plugin_name;

  /**
   * The version of this plugin.
   *
   * @var string $version
   *
   * @access protected
   * @since 0.0.1
   */
  protected $version;

  /**
   * Define the core functionality of the plugin.
   *
   * Set the plugin name and the plugin version that can be used throughout the plugin.
   * Load the dependencies and set the hooks for the admin area and
   * the public-facing side of the site.
   *
   * @since 0.0.1
   */
  public function __construct() {
    $this->plugin_name = 'guillotine';
    $this->version     = '0.0.1';
    $this->load_dependencies();
    $this->define_admin_hooks();
    $this->define_public_hooks();
  }

  /**
   * Load the required dependencies for this plugin.
   *
   * Include the following files that make up the plugin:
   *
   * - Guillotine\Loader. Orchestrates the hooks of the plugin.
   * - Guillotine\Admin. Defines all hooks for the admin area.
   * - Guillotine\Frontend. Defines all hooks for the public side of the site.
   *
   * Create an instance of the loader which will be used to register the hooks with WordPress.
   *
   * @access private
   * @since 0.0.1
   */
  private function load_dependencies() {
    // The class responsible for orchestrating the actions and filters of the core plugin.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-loader.php';

    // The class responsible for defining all actions that occur in the admin area.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-admin.php';

    // The class responsible for defining all actions that occur in the public-facing side of the site.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-frontend.php';
    $this->loader = new Guillotine\Loader();
  }

  /**
   * Register all of the hooks related to the admin area functionality of the plugin.
   *
   * @since 0.0.1
   */
  private function define_admin_hooks() {
    $plugin_admin = new Guillotine\Admin( $this->get_plugin_name(), $this->get_version() );

    // Admin hooks.
    $this->loader->add_action( 'init', $plugin_admin, 'register_custom_post_types' );
    $this->loader->add_action( 'init', $plugin_admin, 'register_gutenberg_plugins' );
    $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_docs_sidebar' );
    $this->loader->add_action( 'graphql_register_types', $plugin_admin, 'register_custom_graphql_types' );
  }

  /**
   * Register all of the hooks related to the public-facing functionality
   *
   * @since 0.0.1
   */
  private function define_public_hooks() {
    $plugin_frontend = new Guillotine\Frontend( $this->get_plugin_name(), $this->get_version() );

    // Frontend hooks.
    $this->loader->add_action( 'INSERT_WP_HOOK', $plugin_frontend, 'INSERT_CALLBACK' );
  }

  /**
   * Run the loader to execute all of the hooks with WordPress.
   *
   * @since 0.0.1
   */
  public function run() {
    $this->loader->run();
  }

  /**
   * The reference to the class that orchestrates the hooks with the plugin.
   *
   * @return Guillotine_Loader    Orchestrates the hooks of the plugin.
   *
   * @since 0.0.1
   */
  public function get_loader() {
    return $this->loader;
  }

  /**
   * Retrieve the name of the plugin.
   *
   * @since 0.0.1
   */
  public function get_plugin_name() {
    return $this->plugin_name;
  }

  /**
   * Retrieve the version number of the plugin.
   *
   * @since 0.0.1
   */
  public function get_version() {
    return $this->version;
  }
}
