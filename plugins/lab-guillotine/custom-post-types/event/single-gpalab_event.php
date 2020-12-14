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

      get_template_part( 'template-parts/content', get_post_type() );
    }
  }

  ?>

</main><!-- #site-content -->

<?php get_footer(); ?>
