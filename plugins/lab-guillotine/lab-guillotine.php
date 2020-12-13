<?php
/**
 * Plugin Name: GPA/LAB Guillotine
 * Plugin URI: https://github.com/IIP-Design/lab-guillotine
 * Description: Plugin to accompany the GPA/LAB headless WordPress theme
 * Version: v0.0.1
 * Author: U.S. Department of State, Bureau of Global Public Affairs Digital Lab <gpa-lab@america.gov>
 * Text Domain: lab-guillotine
 * License: GNU General Public License v2.0
 * License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 *
 * @package GPALAB_Headless
 * @subpackage Guillotine
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
 	die;
}

// Define constants.
define( 'GUILLOTINE_DIR', plugin_dir_path( dirname( __FILE__ ) ) . 'lab-guillotine/' );
define( 'GUILLOTINE_URL', plugin_dir_url( dirname( __FILE__ ) ) . 'lab-guillotine/' );

/**
 * Run functions needed at startup when plugin is installed.
 */
function gpalab_guillotine_activate() {
  require_once plugin_dir_path( __FILE__ ) . 'includes/class-activator.php';

  GUILLOTINE\Activator::activate();
}
register_activation_hook( __FILE__, 'gpalab_guillotine_activate' );

// Imports Guillotine class.
require plugin_dir_path( __FILE__ ) . 'includes/class-guillotine.php';

/**
 * Begin execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since 0.0.1
 */
function run_guillotine() {
  $plugin = new Guillotine();
  $plugin->run();
}

run_guillotine();
