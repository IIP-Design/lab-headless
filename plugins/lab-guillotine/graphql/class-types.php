<?php
/**
 * Registers the Types class.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register custom GraphQL Types to appear in the GraphQL API.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */
class Types {

  /**
   * Register custom GraphQL types required for compatibility with the Styled Block Builder plugin.
   *
   * @since 0.0.1
   */
  public function register_styled_block_meta_types() {
    include_once GUILLOTINE_DIR . 'graphql/types/class-styled-blocks.php';
    $blocks = new Styled_Blocks();

    /** Primitive types must be registered first. */

    register_graphql_object_type(
      'articleMeta',
      $blocks->article_schema()
    );

    register_graphql_object_type(
      'buttonMeta',
      $blocks->button_schema()
    );

    register_graphql_object_type(
      'fileMeta',
      $blocks->file_schema()
    );

    register_graphql_object_type(
      'videoMeta',
      $blocks->video_schema()
    );

    /** Simple types may rely on primitives. */

    register_graphql_object_type(
      'eventMeta',
      $blocks->event_schema()
    );

    register_graphql_object_type(
      'lineMeta',
      $blocks->line_schema()
    );

    register_graphql_object_type(
      'linkMeta',
      $blocks->link_schema()
    );

    register_graphql_object_type(
      'navMeta',
      $blocks->nav_schema()
    );

    register_graphql_object_type(
      'resourceMeta',
      $blocks->resource_schema()
    );

    register_graphql_object_type(
      'slideMeta',
      $blocks->slide_schema()
    );

    register_graphql_object_type(
      'statMeta',
      $blocks->stat_schema()
    );

    /** Compound types rely on primitive and simple types. */

    register_graphql_object_type(
      'articleFeedMeta',
      $blocks->article_feed_schema()
    );

    register_graphql_object_type(
      'heroMeta',
      $blocks->hero_schema()
    );

    register_graphql_object_type(
      'linkListMeta',
      $blocks->link_list_schema()
    );

    register_graphql_object_type(
      'navigationMeta',
      $blocks->navigation_schema()
    );

    register_graphql_object_type(
      'parallaxMeta',
      $blocks->parallax_schema()
    );

    register_graphql_object_type(
      'quoteBoxMeta',
      $blocks->quote_box_schema()
    );

    register_graphql_object_type(
      'resourcesMeta',
      $blocks->resources_schema()
    );

    register_graphql_object_type(
      'slidesMeta',
      $blocks->slides_schema()
    );

    register_graphql_object_type(
      'statsMeta',
      $blocks->stats_schema()
    );

    register_graphql_object_type(
      'textMeta',
      $blocks->text_schema()
    );

    register_graphql_object_type(
      'timelineMeta',
      $blocks->timeline_schema()
    );
  }

  /**
   * Registers union types pertaining to the Styled Block Builder plugin.
   *
   * @param object $type_registry  List of available types.
   *
   * @since 0.0.1
   */
  public function register_styled_blocks_union( $type_registry ) {
    $resolve = function( $meta ) use ( $type_registry ) {
      $type = null;

      // phpcs:disable PSR2.ControlStructures.SwitchDeclaration.BreakIndent
      switch ( $meta['type'] ) {
        case 'articleFeedMeta':
          $type = $type_registry->get_type( 'articleFeedMeta' );
          break;

        case 'heroMeta':
          $type = $type_registry->get_type( 'heroMeta' );
          break;

        case 'linkListMeta':
          $type = $type_registry->get_type( 'linkListMeta' );
          break;

        case 'navigationMeta':
          $type = $type_registry->get_type( 'navigationMeta' );
          break;

        case 'parallaxMeta':
          $type = $type_registry->get_type( 'parallaxMeta' );
          break;

        case 'quoteBoxMeta':
          $type = $type_registry->get_type( 'quoteBoxMeta' );
          break;

        case 'resourcesMeta':
          $type = $type_registry->get_type( 'resourcesMeta' );
          break;

        case 'slidesMeta':
          $type = $type_registry->get_type( 'slidesMeta' );
          break;

        case 'statsMeta':
          $type = $type_registry->get_type( 'statsMeta' );
          break;

        case 'textMeta':
          $type = $type_registry->get_type( 'textMeta' );
          break;

        case 'timelineMeta':
          $type = $type_registry->get_type( 'timelineMeta' );
          break;
      }
      // phpcs:enable

      return $type;
    };

    register_graphql_union_type(
      'blockMetaUnion',
      array(
        'typeNames'   => array(
          'articleFeedMeta',
          'heroMeta',
          'linkListMeta',
          'navigationMeta',
          'parallaxMeta',
          'quoteBoxMeta',
          'resourcesMeta',
          'slidesMeta',
          'statsMeta',
          'textMeta',
          'timelineMeta',
        ),
        'resolveType' => $resolve,
      )
    );
  }

  /**
   * Registers the 'styledBlock' type to provide compatibility with the Styled Block Builder plugin.
   *
   * @since 0.0.1
   */
  public function register_styled_block_type() {
    register_graphql_object_type(
      'styledBlock',
      array(
        'description' => __( 'Something something blocks', 'gpalab-guillotine' ),
        'fields'      => array(
          'id'   => array(
            'type'        => 'String',
            'description' => __( 'A unique identifier attached to every block.', 'gpalab-guillotine' ),
          ),
          'meta' => array(
            'type'        => 'blockMetaUnion',
            'description' => __( 'Block metadata, which is used to render out the block content.', 'gpalab-guillotine' ),
          ),
          'type' => array(
            'type'        => 'String',
            'description' => __( 'Specifies the type of block.', 'gpalab-guillotine' ),
          ),
        ),
      )
    );
  }
}
