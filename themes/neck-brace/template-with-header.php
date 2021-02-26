<?php
/**
 * Template Name: Page With Header
 * Template Post Type: page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package GPALAB_Headless
 * @subpackage Neck_Brace
 * @since 0.0.1
 */

get_header();
?>

<main id="site-content" role="main">

  <?php

  if ( have_posts() ) {

    while ( have_posts() ) {
      the_post();

      $cover_image = has_post_thumbnail( get_the_ID() )
                   ? get_the_post_thumbnail_url( get_the_ID() )
                   : get_stylesheet_directory_uri() . '/assets/brick-seal.jpg';

      ?>
      <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

        <div
          class="cover-header  bg-image bg-attachment-fixed"
          style="background-image: url(
            <?php echo esc_url( $cover_image ); ?>
          )"
        >
          <div class="cover-header-inner-wrapper screen-height">
            <div class="cover-color-overlay color-accent opacity-0"></div>
          </div>
        </div>

        <div class="post-inner thin">
          <div class="entry-content">

            <?php
            the_content();
            ?>

          </div>
        </div>

      </article>
      <?php
    }
  }

  ?>

</main><!-- #site-content -->

<?php get_footer(); ?>
