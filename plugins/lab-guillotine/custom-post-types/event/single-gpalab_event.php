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

        <figure class="featured-media gpalab-featured-image">
          <div class="featured-media-inner section-inner">
            <?php the_post_thumbnail(); ?>
          </div>
        </figure>

        <div class="post-inner thin">
          <div class="entry-content">
            <h2><?php the_title(); ?></h2>

            <?php
            $date = get_post_meta( get_the_ID(), '_gpalab_event_date', true );

            if ( ! empty( $date ) ) {
              $date_format = get_option( 'date_format' );
              $time_format = get_option( 'time_format' );
              $format      = $date_format . ' ' . $time_format . ' T';

              $formatted = date_i18n( $format, strtotime( $date ) );
              echo '<p><strong>' . esc_html( __( 'When', 'gpalab-guillotine' ) ) . ': </strong>' . esc_html( $formatted ) . '<p>';
            }

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
