<?php
/**
 * Registers the Block_Manager class.
 *
 * @package Guillotine\Block_Manager
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Overrides the default WordPress Gutenberg block settings.
 *
 * The Block_Manager class limits available blocks to those supported by the headless frontend.
 *
 * @package Guillotine\Block_Manager
 * @since 0.0.1
 */
class Block_Manager {
  /**
   * Limits the available Gutenberg blocks to those supported by the headless frontend.
   *
   * @param array $allowed_blocks   Default list of blocks to be provided in the administrative screens.
   * @return array                  Filtered list of allowed blocks.
   *
   * @since 0.0.1
   * @see ../docs/gutenberg-blocks.md for full list of supported/unsupported blocks.
   */
  public function set_allowed_block_types( $allowed_blocks ) {
    return array(
      'core/buttons',
      'core/code',
      'core/heading',
      'core/image',
      'core/list',
      'core/paragraph',
    );
  }
}
