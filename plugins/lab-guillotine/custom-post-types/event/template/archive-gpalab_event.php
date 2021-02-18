<?php
/**
 * The template for displaying the archive page for the GPA/LAB event custom post type.
 *
 * Contains the opening of the #site-footer div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package GPALAB_Headless
 * @subpackage Neck_Brace
 * @since 0.0.1
 */

get_header();

$page_title   = __( 'Our Events', 'gpalab-neck' );
$future_title = __( 'Upcoming Events', 'gpalab-neck' );
$past_title   = __( 'Past Events', 'gpalab-neck' );
?>

<main id="site-content" role="main">
  <div
    class="cover-header  bg-image bg-attachment-fixed"
    style="background-image: url(
      <?php the_post_thumbnail_url(); ?>
    )"
  >
    <div class="cover-header-inner-wrapper screen-height">
      <div class="cover-header-inner">
        <div class="cover-color-overlay color-accent opacity-0"></div>
        <header class="entry-header has-text-align-center">
          <div class="entry-header-inner section-inner medium">
          </div>
        </header>
      </div>
    </div>
  </div>

  <div class="post-inner thin">
    <div class="entry-content gpalab-events-content">

    <?php

    if ( have_posts() ) {
      while ( have_posts() ) {
        the_post();

        $date = get_post_meta( get_the_ID(), '_gpalab_event_date', true );

        if ( $date > gmdate( 'Y-m-dTH:i:s' ) === false ) {
          continue;
        }

        ?>
        <article class="gpalab-event-upcoming" id="event-<?php the_ID(); ?>">
          <h3 class="gpalab-event-upcoming-title"><?php the_title(); ?></h3>
          <?php require 'template-parts/add-to-cal.php'; ?>
          <div class="gpalab-event-upcoming-content">
            <?php the_content(); ?>
          </div>
        </article>
        <?php
      }

      ?>
      <h3 class="gpalab-events-title"><?php echo esc_html( $past_title ); ?></h3>
      <div class="gpalab-events-grid"> 
      <?php

      while ( have_posts() ) {
        the_post();

        $date = get_post_meta( get_the_ID(), '_gpalab_event_date', true );

        if ( $date > gmdate( 'Y-m-dTH:i:s' ) ) {
          continue;
        }

        $formatted = '';

        if ( ! empty( $date ) ) {
          $date_format = get_option( 'date_format' );
          $time_format = get_option( 'time_format' );
          $format      = $date_format . ' ' . $time_format . ' T';

          $formatted = date_i18n( $format, strtotime( $date ) );
        }

        ?>
        <article class="gpalab-event-card" id="event-<?php the_ID(); ?>">
          <a class="gpalab-event-card-link" href="<?php the_permalink(); ?>">
            <?php
              the_post_thumbnail(
                'medium',
                array(
                  'class' => 'gpalab-event-card-image',
                )
              );
            ?>
            <div class="gpalab-event-card-content">
              <h5 class="gpalab-event-card-title"><?php the_title(); ?></h5>
              <p class="gpalab-event-card-date"><?php echo esc_html( $formatted ); ?></p>
            </div>
          </a>
        </article>
        <?php

      }
      ?>
        </div>
      <?php
    }

    ?>

    </div><!-- .entry-content -->
  </div>
</main><!-- #site-content -->

<?php get_footer(); ?>
