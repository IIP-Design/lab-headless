<?php
/**
 * The template for displaying the footer
 *
 * Contains the opening of the #site-footer div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package GPALAB_Headless
 * @subpackage Neck_Brace
 * @since 0.0.1
 */

$bureau_url = '<a href="https://www.state.gov/bureaus-offices/under-secretary-for-public-diplomacy-and-public-affairs/bureau-of-global-public-affairs/">Bureau of Global Public Affairs</a>';

/* translators: %s: HTML anchor link to Bureau site */
$site_links = __( 'An official website of the %s.', 'gpalab-neck' );

/* translators: %s: HTML character for up arrow. */
$to_top = __( 'To the top %s', 'gpalab-neck' );
/* translators: %s: HTML character for up arrow. */
$up = __( 'Up %s', 'gpalab-neck' );

?>
      <footer id="site-footer" role="contentinfo" class="header-footer-group">

        <div class="section-inner">

          <div class="footer-lines">
            <img
              alt="Department of State Seal"
              height="60px"
              width="60px"
              src=<?php echo esc_url( get_stylesheet_directory_uri() . '/assets/dos_stamp_white.png' ); ?>
            />
            <p class="footer-lines-content">
              <?php printf( esc_html( $site_links ), wp_kses( $bureau_url, 'post' ) ); ?>
            </p>
          </div>

          <a class="to-the-top" href="#site-header">
            <span class="to-the-top-long">
              <?php printf( esc_html( $to_top ), '<span class="arrow" aria-hidden="true">&uarr;</span>' ); ?>
            </span>

            <span class="to-the-top-short">
              <?php printf( esc_html( $up ), '<span class="arrow" aria-hidden="true">&uarr;</span>' ); ?>
            </span>
          </a><!-- .to-the-top -->

        </div><!-- .section-inner -->

      </footer><!-- #site-footer -->

    <?php wp_footer(); ?>

  </body>
</html>
