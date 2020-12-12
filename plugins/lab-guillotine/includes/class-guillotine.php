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
    $this->define_cpt_hooks();
    $this->define_block_manager_hooks();
    $this->define_docs_hub_hooks();
  }

  /**
   * Load the required dependencies for this plugin.
   *
   * Include the following classes that make up the plugin:
   *
   * - Guillotine\Loader. Orchestrates the hooks of the plugin.
   * - Guillotine\Admin. Defines all hooks for the admin area.
   * - Guillotine\Frontend. Defines all hooks for the public side of the site.
   * - Guillotine\Block_Manager
   * - Guillotine\Docs_Connect_Repo. Defines all hooks for the Docs Hub connect repo page.
   * - Guillotine\Docs_Settings. Defines all hooks for the Docs Hub settings page.
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
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-settings.php';

    // The class responsible for defining all hooks that create the plugin's custom post types.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'custom-post-types/event/class-event-cpt.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'custom-post-types/event/class-event-front.php';

    // The class responsible for defining all hooks that manage the functioning of Gutenberg block.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'block-manager/class-block-manager.php';

    // The class responsible for defining all hooks that provide the documentation hub capabilities.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'docs-hub/class-docs-connect-repo.php';
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'docs-hub/class-docs-settings.php';

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
    $plugin_admin    = new Guillotine\Admin( $this->get_plugin_name(), $this->get_version() );
    $plugin_settings = new Guillotine\Settings( $this->get_plugin_name(), $this->get_version() );

    $this->loader->add_action( 'admin_menu', $plugin_settings, 'add_settings_page' );
    $this->loader->add_action( 'admin_init', $plugin_settings, 'populate_guillotine_settings' );
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
   * Register all of the hooks related to the plugin's custom post types.
   *
   * @since 0.0.1
   */
  private function define_cpt_hooks() {
    $event_cpt   = new Guillotine\Event_CPT( $this->get_plugin_name(), $this->get_version() );
    $event_front = new Guillotine\Event_Front( $this->get_plugin_name(), $this->get_version() );

    // Hooks used by the event custom post type.
    $this->loader->add_action( 'init', $event_cpt, 'register_event_cpt' );
    $this->loader->add_filter( 'template_include', $event_front, 'include_event_single', 1 );
  }


  /**
   * Register all of the hooks related to the Gutenberg block manager.
   *
   * @since 0.0.1
   */
  private function define_block_manager_hooks() {
    $block_manager = new Guillotine\Block_Manager( $this->get_plugin_name(), $this->get_version() );

    if ( ! empty( get_option( 'gpalab_guillotine_block_manager' ) ) ) {
      // Documentation hub settings page hooks.
      $this->loader->add_action( 'allowed_block_types', $block_manager, 'set_allowed_block_types' );
    }
  }

  /**
   * Register all of the hooks related to the Documentation Hub.
   *
   * @since 0.0.1
   */
  private function define_docs_hub_hooks() {
    $connect_repo  = new Guillotine\Docs_Connect_Repo( $this->get_plugin_name(), $this->get_version() );
    $docs_settings = new Guillotine\Docs_Settings( $this->get_plugin_name(), $this->get_version() );

    if ( ! empty( get_option( 'gpalab_guillotine_docs_hub' ) ) ) {
      // Documentation hub settings page hooks.
      $this->loader->add_action( 'admin_menu', $docs_settings, 'add_docs_hub_page' );
      $this->loader->add_action( 'admin_init', $docs_settings, 'populate_docs_settings' );

      // Documentation hub connect a repo page hooks.
      $this->loader->add_action( 'init', $connect_repo, 'register_connect_repo_scripts' );
      $this->loader->add_action( 'admin_menu', $connect_repo, 'add_connect_repo_page' );
      $this->loader->add_action( 'admin_enqueue_scripts', $connect_repo, 'enqueue_connect_repo' );
    }
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
