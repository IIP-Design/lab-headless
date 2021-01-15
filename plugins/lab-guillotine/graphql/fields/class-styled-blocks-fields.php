<?php
/**
 * Registers the Styled_Blocks_Fields class.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register custom fields to appear in the GraphQL API.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */
class Styled_Blocks_Fields {

   /**
    * Adds the styled block fields to pages and posts in the GraphQL API.
    *
    * @since 0.0.1
    */
  public function register_style_blocks_field() {
    // Fetch the linked blocks from post metadata.
    $resolve = function( $post ) {
      $blocks = get_post_meta( $post->ID, 'gpalab_blocks', true );

      $with_typename = array();

      if ( ! empty( $blocks ) ) {

        // Add the required __typename property to all block metadata objects.
        foreach ( $blocks as $block ) {
          $temp = $block;

          $temp['meta']['__typename'] = $this->get_typename( $block['type'] );

          array_push( $with_typename, $temp );
        }

        unset( $block );
      }

      return $with_typename;
    };

    // Identify the posts types where block data should be surfaced.
    $supported_types = array( 'page', 'post' );

    // Identify the posts types where block data should be surfaced.
    foreach ( $supported_types as $type ) {

      register_graphql_field(
        $type,
        'gpalabBlocks',
        array(
          'description' => __( 'Styled content blocks provided by the Styled Block Builder plugin', 'gpalab-guillotine' ),
          'resolve'     => $resolve,
          'type'        => array( 'list_of' => 'styledBlock' ),
        )
      );

    }
  }

  /**
   * Converts the block type to an expected meta typename.
   *
   * @param string $type    Block type pulled off of block data.
   * @return string         Block type transformed for use by GraphQL as meta typename.
   *
   * @since 0.0.1
   */
  private function get_typename( $type ) {
    $pascal_case = str_replace( '-', '', ucwords( $type, '-' ) );

    return $pascal_case . 'Meta';
  }
}
