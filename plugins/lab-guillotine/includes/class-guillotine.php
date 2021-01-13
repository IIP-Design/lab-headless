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
   * The directory from which the plugin should enqueue scripts and styles.
   * Used to set development builds that are excluded from source control.
   *
   * @var string $build_dir
   *
   * @access protected
   * @since 0.0.1
   */
  protected $build_dir;

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
    $this->build_dir   = $this->set_build_dir();

    $this->load_dependencies();
    $this->define_admin_hooks();
    $this->define_public_hooks();
    $this->define_cpt_hooks();
    $this->define_block_manager_hooks();
    $this->define_docs_hub_hooks();
  }

  /**
   * Check whether the plugin is in development mode and set the build directory appropriately.
   *
   * @return string   The name of the build directory.
   *
   * @since 0.0.1
   */
  private function set_build_dir() {
    $build_dir = 'build';
    $settings  = get_option( 'gpalab_guillotine', array() );

    if ( ! empty( $settings['dev_build'] ) && 'on' === $settings['dev_build'] ) {
      $build_dir = 'build-dev';
    }

    return $build_dir;
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

    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'gutenberg-blocks/class-blocks.php';

    // The class responsible for defining all hooks that manage the functioning of Gutenberg block.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'block-manager/class-block-manager.php';

    // The class responsible for defining all hooks that provide the documentation hub capabilities.
    require_once plugin_dir_path( dirname( __FILE__ ) ) . 'docs-hub/class-docs-ajax.php';
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
    $plugin_admin    = new Guillotine\Admin( $this->get_plugin_name(), $this->get_version(), $this->get_build_dir() );
    $plugin_blocks   = new Guillotine\Blocks( $this->get_plugin_name(), $this->get_version(), $this->get_build_dir() );
    $plugin_settings = new Guillotine\Settings( $this->get_plugin_name(), $this->get_version() );

    $this->loader->add_action( 'admin_menu', $plugin_settings, 'add_settings_page' );
    $this->loader->add_action( 'admin_init', $plugin_settings, 'populate_guillotine_settings' );
    $this->loader->add_action( 'update_option_gpalab_guillotine', $plugin_settings, 'initialize_docs_table', 10, 2 );

    $this->loader->add_action( 'init', $plugin_blocks, 'register_custom_blocks' );
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
    $event_cpt   = new Guillotine\Event_CPT( $this->get_plugin_name(), $this->get_version(), $this->get_build_dir() );
    $event_front = new Guillotine\Event_Front( $this->get_plugin_name(), $this->get_version(), $this->get_build_dir() );

    // Hooks used by the event custom post type.
    $this->loader->add_action( 'init', $event_cpt, 'register_event_cpt' );
    $this->loader->add_action( 'init', $event_cpt, 'register_event_gutenberg_plugin' );
    $this->loader->add_action( 'admin_enqueue_scripts', $event_cpt, 'enqueue_event_sidebar' );

    $this->loader->add_filter( 'template_include', $event_front, 'include_event_single', 1 );
    $this->loader->add_filter( 'wp_enqueue_scripts', $event_front, 'enqueue_events_frontend' );
    $this->loader->add_filter( 'body_class', $event_front, 'append_overlay_class' );
  }

  /**
   * Register all of the hooks related to the Gutenberg block manager.
   *
   * @since 0.0.1
   */
  private function define_block_manager_hooks() {
    $block_manager = new Guillotine\Block_Manager( $this->get_plugin_name(), $this->get_version() );

    $enabled = get_option( 'gpalab_guillotine' );

    if ( ! empty( $enabled ) && ! empty( $enabled['block_manager'] ) ) {
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
    $docs_ajax     = new Guillotine\Docs_Ajax( $this->get_plugin_name(), $this->get_version() );
    $docs_connect  = new Guillotine\Docs_Connect_Repo( $this->get_plugin_name(), $this->get_version(), $this->get_build_dir() );
    $docs_settings = new Guillotine\Docs_Settings( $this->get_plugin_name(), $this->get_version() );

    $enabled = get_option( 'gpalab_guillotine' );

    if ( ! empty( $enabled ) && ! empty( $enabled['docs_hub'] ) ) {
      // Handle data sent from the UI to the server.
      $this->loader->add_action( 'wp_ajax_gpalab_docs_hub_save', $docs_ajax, 'handle_add_repo' );

      // Documentation hub settings page hooks.
      $this->loader->add_action( 'admin_menu', $docs_settings, 'add_docs_hub_page' );
      $this->loader->add_action( 'admin_init', $docs_settings, 'populate_docs_settings' );

      // Documentation hub connect a repo page hooks.
      $this->loader->add_action( 'init', $docs_connect, 'register_connect_repo_scripts' );
      $this->loader->add_action( 'admin_menu', $docs_connect, 'add_connect_repo_page' );
      $this->loader->add_action( 'admin_enqueue_scripts', $docs_connect, 'enqueue_connect_repo' );
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
   * Retrieve the name of the build directory.
   *
   * @since 0.0.1
   */
  public function get_build_dir() {
    return $this->build_dir;
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
