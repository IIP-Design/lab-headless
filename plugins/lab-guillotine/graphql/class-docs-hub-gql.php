<?php
/**
 * Registers the Docs_Hub_GQL class.
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
class Docs_Hub_GQL {

  /**
   * Register all fields and types for the styled block builder.
   *
   * @since 0.0.1
   */
  public function register_docs_hub_gql() {
    // Load in Types class in order to register custom types.
    include_once GUILLOTINE_DIR . 'graphql/types/class-docs-hub-types.php';
    $types = new Docs_Hub_Types();

    $types->register_docs_hub_type();

    // Load in Types class in order to register custom types.
    include_once GUILLOTINE_DIR . 'graphql/fields/class-docs-hub-fields.php';
    $fields = new Docs_Hub_Fields();

    $fields->register_docs_hub_field();
  }
}
