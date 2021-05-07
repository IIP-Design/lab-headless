<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

/** Autoload files **/
require_once __DIR__ . '/vendor/autoload.php';

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', getenv( 'LAB_DB_NAME' ) );

/** MySQL database username */
define( 'DB_USER', getenv( 'LAB_DB_USER' ) );

/** MySQL database password */
define( 'DB_PASSWORD', getenv( 'LAB_DB_PASSWORD' ) );

/** MySQL hostname */
define( 'DB_HOST', getenv( 'LAB_DB_HOST' ) );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY', getenv( 'LAB_AUTH_KEY' ) );
define( 'SECURE_AUTH_KEY', getenv( 'LAB_SECURITY_AUTH_KEY' ) );
define( 'LOGGED_IN_KEY', getenv( 'LAB_LOGGED_IN_KEY' ) );
define( 'NONCE_KEY', getenv( 'LAB_NONCE_KEY' ) );
define( 'AUTH_SALT', getenv( 'LAB_AUTH_SALT' ) );
define( 'SECURE_AUTH_SALT', getenv( 'LAB_SECURE_AUTH_SALT' ) );
define( 'LOGGED_IN_SALT', getenv( 'LAB_LOGGED_IN_SALT' ) );
define( 'NONCE_SALT', getenv( 'LAB_NONCE_SALT' ) );

/** AWS S3 Uploads directory **/
if ( isset( $_SERVER['LAB_S3_UPLOADS_BUCKET'] ) && isset( $_SERVER['LAB_S3_UPLOADS_REGION'] ) ) {
  // Determine the prefix to be appended to uploaded files.
  $prefix  = isset( $_SERVER['LAB_S3_UPLOADS_PREFIX'] ) ? getenv('LAB_S3_UPLOADS_PREFIX') : 'uploads/';

  // Settings that are shared by both  IAM role and key-secret authentication methods.
  $s3_settings = array(
    'bucket' => getenv('LAB_S3_UPLOADS_BUCKET'),
    'copy-to-s3' => true,
    'enable-object-prefix' => true,
    'force-https' => true,
    'object-prefix' => $prefix,
    'object-versioning' => true,
    'provider' => 'aws',
    'region' => getenv('LAB_S3_UPLOADS_REGION'),
    'remove-local-file' => true,
    'use-yearmonth-folders' => true,
  );

  // By default we try to connect using server roles.
  if ( ! isset( $_SERVER['LAB_S3_UPLOADS_IAM_ROLES'] ) || 'false' !== $_SERVER['LAB_S3_UPLOADS_IAM_ROLES'] ) {
    $s3_settings['use-server-roles'] = true;
  } elseif ( isset( $_SERVER['LAB_S3_UPLOADS_KEY'] ) && isset( $_SERVER['LAB_S3_UPLOADS_SECRET'] ) ) {
    // Fallback to access/secret key when not using server roles.
    $s3_settings['access-key-id'] = getenv('LAB_S3_UPLOADS_KEY');
    $s3_settings['secret-access-key'] = getenv('LAB_S3_UPLOADS_SECRET');
  }

  define( 'AS3CF_SETTINGS', serialize( $s3_settings ) );
}

/** Use instance profile to connect to AWS SES */
define( 'WPOSES_AWS_USE_EC2_IAM_ROLE', true );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );

/** Disable the installation of default themes and plugins. */
define( 'CORE_UPGRADE_SKIP_NEW_BUNDLED', true );

/** Tells WordPress to look for the wp-content directory in a non-standard location. */
define( 'WP_CONTENT_DIR', __DIR__ . '/wp-content' );

if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && 'https' === $_SERVER['HTTP_X_FORWARDED_PROTO'] ) {
  define( 'WP_CONTENT_URL', 'https://' . $_SERVER['SERVER_NAME'] . '/wp-content' );
  define( 'WP_SITEURL', 'https://' . $_SERVER['SERVER_NAME'] . '/' );
  define( 'WP_HOME', 'https://' . $_SERVER['SERVER_NAME'] );
      $_SERVER['HTTPS'] = 'on';
} else {
  define( 'WP_CONTENT_URL', 'http://' . $_SERVER['SERVER_NAME'] . '/wp-content' );
  define( 'WP_SITEURL', 'http://' . $_SERVER['SERVER_NAME'] . '/' );
  define( 'WP_HOME', 'http://' . $_SERVER['SERVER_NAME'] );
}

/* Multisite */
define( 'WP_ALLOW_MULTISITE', true );
define( 'SUBDOMAIN_INSTALL', true );
define( 'MULTISITE', true );
define( 'DOMAIN_CURRENT_SITE', getenv( 'LAB_DOMAIN_CURRENT_SITE' ) );
define( 'PATH_CURRENT_SITE', '/' );
define( 'SITE_ID_CURRENT_SITE', 1 );
define( 'BLOG_ID_CURRENT_SITE', 1 );

define( 'SUNRISE', 'on' );

define( 'WP_DEFAULT_THEME', 'gpalab-ichabod' );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
  define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
