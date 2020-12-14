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
$state_url  = '<a href="https://state.gov/">U.S. Department of State</a>';

/* translators: %1$s: HTML anchor link to Bureau site, %2$s: HTML anchor link to Department site. */
$site_links = __( 'This site is managed by the %1$s within the %2$s.', 'gpalab-neck' );
$contact    = __( 'Contact us at', 'gpalab-neck' );

/* translators: %s: HTML character for up arrow. */
$to_top = __( 'To the top %s', 'gpalab-neck' );
/* translators: %s: HTML character for up arrow. */
$up = __( 'Up %s', 'gpalab-neck' );

?>
      <footer id="site-footer" role="contentinfo" class="header-footer-group">

        <div class="section-inner">

          <div class="footer-lines">
            <p class="footer-lines-content">
              <?php printf( esc_html( $site_links ), wp_kses( $bureau_url, 'post' ), wp_kses( $state_url, 'post' ) ); ?>
            </p>
            <p class="footer-lines-content"><?php echo esc_html( $contact ); ?>: <a href="mailto:gpa-lab@america.gov">gpa-lab@america.gov</a></p>
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
