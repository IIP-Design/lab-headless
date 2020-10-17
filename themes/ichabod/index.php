<?php
/**
 * The main template file.
 *
 * This file redirects all users from the the WordPress site's frontend to
 * the redirect URL provided in the theme's settings page.
 *
 * @package GPALAB_Headless
 * @subpackage Ichabod
 *
 * @since 1.0.0
 */

?>

<head>

  <title><?php bloginfo( 'title' ); ?> | Placeholder</title>

  <?php wp_head(); ?>

</head>

<?php


// Fetch the redirect URL set in the theme settings.
$redirect = get_option( 'gpalab-ichabod-redirect' );

/**
 * If a redirect url has been saved in the site settings the user will the sent
 * to the proper page. Otherwise, they will see a landing page informing them that
 * there is no content at this URL.
 *
 * @since 1.0.0
 */
if ( ! empty( $redirect ) ) {
  ?>

    <script type="text/javascript">
      window.location = "<?php $redirect; ?>";
    </script>

  <?php
} else {
  $image = get_template_directory_uri() . '/assets/gpa_logo_external_horizontal.png';

  ?>
    <div class="ichabod-image-container">
      <img
        alt="Bureau of Global Public Affairs, U.S. Department of State"
        class="ichabod-image"
        src="<?php echo esc_url( $image ); ?>"
      />
    </div>
  
    <footer>
      <script type="text/javascript">
        console.error("No Content On This Page:\nThis is only a placeholder page.")
      </script>
    </footer>

  <?php
}
