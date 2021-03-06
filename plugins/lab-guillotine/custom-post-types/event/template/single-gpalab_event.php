<?php
/**
 * Template Name: GPA/LAB Event
 * Template Post Type: gpalab_event
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Guillotine
 * @since 0.0.1
 */

get_header();
?>

<main id="site-content" role="main">

  <?php

  if ( have_posts() ) {

    while ( have_posts() ) {
      the_post();

      ?>
      <article class="gpalab-event" id="post-<?php the_ID(); ?>">

        <?php
        if ( has_post_thumbnail( get_the_ID() ) ) {
          ?>
          <div
            class="cover-header  bg-image bg-attachment-fixed"
            style="background-image: url(
              <?php echo esc_url( get_the_post_thumbnail_url( get_the_ID() ) ); ?>
            )"
          >
            <div class="cover-header-inner-wrapper screen-height">
              <div class="cover-color-overlay color-accent opacity-0"></div>
            </div>
          </div>
          <?php
        }
        ?>

        <div class="post-inner thin">
          <div class="entry-content">
            <h2 class="gpalab-event-header"><?php the_title(); ?></h2>

            <?php
            $date = get_post_meta( get_the_ID(), '_gpalab_event_date', true );

            require 'template-parts/add-to-cal.php';

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
