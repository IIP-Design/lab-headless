<?php
/**
 * Registers the Styled_Blocks_Unions class.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register custom GraphQL union types to appear in the GraphQL API.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */
class Styled_Blocks_Unions {

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
}
