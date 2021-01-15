<?php
/**
 * Registers the Styled_Blocks_Types class.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Registers types for the for the Styled Block Builder plugin.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */
class Styled_Blocks_Types {

  /**
   * Registers the 'styledBlock' type to provide compatibility with the Styled Block Builder plugin.
   *
   * @since 0.0.1
   */
  public function register_styled_block_type() {
    register_graphql_object_type(
      'styledBlock',
      array(
        'description' => __( 'Customized content blocks blocks', 'gpalab-guillotine' ),
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

  /**
   * Register custom GraphQL types required for compatibility with the Styled Block Builder plugin.
   *
   * @since 0.0.1
   */
  public function register_styled_block_meta_types() {
    include_once GUILLOTINE_DIR . 'graphql/schema/class-styled-blocks-schema.php';
    $schema = new Styled_Blocks_Schema();

    /** Primitive types must be registered first. */

    register_graphql_object_type(
      'articleMeta',
      $schema->article_schema()
    );

    register_graphql_object_type(
      'buttonMeta',
      $schema->button_schema()
    );

    register_graphql_object_type(
      'fileMeta',
      $schema->file_schema()
    );

    register_graphql_object_type(
      'videoMeta',
      $schema->video_schema()
    );

    /** Simple types may rely on primitives. */

    register_graphql_object_type(
      'eventMeta',
      $schema->event_schema()
    );

    register_graphql_object_type(
      'lineMeta',
      $schema->line_schema()
    );

    register_graphql_object_type(
      'linkMeta',
      $schema->link_schema()
    );

    register_graphql_object_type(
      'navMeta',
      $schema->nav_schema()
    );

    register_graphql_object_type(
      'resourceMeta',
      $schema->resource_schema()
    );

    register_graphql_object_type(
      'slideMeta',
      $schema->slide_schema()
    );

    register_graphql_object_type(
      'statMeta',
      $schema->stat_schema()
    );

    /** Compound types rely on primitive and simple types. */

    register_graphql_object_type(
      'articleFeedMeta',
      $schema->article_feed_schema()
    );

    register_graphql_object_type(
      'heroMeta',
      $schema->hero_schema()
    );

    register_graphql_object_type(
      'linkListMeta',
      $schema->link_list_schema()
    );

    register_graphql_object_type(
      'navigationMeta',
      $schema->navigation_schema()
    );

    register_graphql_object_type(
      'parallaxMeta',
      $schema->parallax_schema()
    );

    register_graphql_object_type(
      'quoteBoxMeta',
      $schema->quote_box_schema()
    );

    register_graphql_object_type(
      'resourcesMeta',
      $schema->resources_schema()
    );

    register_graphql_object_type(
      'slidesMeta',
      $schema->slides_schema()
    );

    register_graphql_object_type(
      'statsMeta',
      $schema->stats_schema()
    );

    register_graphql_object_type(
      'textMeta',
      $schema->text_schema()
    );

    register_graphql_object_type(
      'timelineMeta',
      $schema->timeline_schema()
    );
  }
}
