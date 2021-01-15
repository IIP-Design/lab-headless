<?php
/**
 * Registers the Styled_Blocks_GQL class.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register enable Styled Block Builder compatibility in the GraphQL API.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */
class Styled_Blocks_GQL {

  /**
   * Register all fields and types for the styled block builder.
   *
   * @since 0.0.1
   */
  public function register_styled_blocks_gql() {
    // Load in Types class in order to register custom types.
    include_once GUILLOTINE_DIR . 'graphql/types/class-styled-blocks-types.php';
    $types = new Styled_Blocks_Types();

    $types->register_styled_block_meta_types();
    $types->register_styled_block_type();

    // Load in Types class in order to register custom types.
    include_once GUILLOTINE_DIR . 'graphql/fields/class-styled-blocks-fields.php';
    $fields = new Styled_Blocks_Fields();

    $fields->register_style_blocks_field();
  }
}
