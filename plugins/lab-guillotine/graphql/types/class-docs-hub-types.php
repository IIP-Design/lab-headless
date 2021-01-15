<?php
/**
 * Registers the Docs_Hub_Types class.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Registers types for the for the Docs Hub.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */
class Docs_Hub_Types {

  /**
   * Registers the 'gpalabDocsPage' type to expose the Docs Hub in the GraphQL API.
   *
   * @since 0.0.1
   */
  public function register_docs_hub_type() {
    include_once GUILLOTINE_DIR . 'graphql/schema/class-docs-hub-schema.php';
    $schema = new Docs_Hub_Schema();

    register_graphql_object_type(
      'gpalabDocsPage',
      $schema->docs_page_schema()
    );
  }
}
