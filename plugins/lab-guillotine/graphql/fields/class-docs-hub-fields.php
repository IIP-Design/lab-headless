<?php
/**
 * Registers the Docs_Hub_Fields class.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Describes the schema for the docs hub data.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */
class Docs_Hub_Fields {

  /**
   * Adds the Docs Hub pages to the root query of the GraphQL API.
   *
   * @since 0.0.1
   */
  public function register_docs_hub_field() {
    register_graphql_field(
      'RootQuery',
      'gpalabDocsPages',
      array(
        'description' => __( 'A documentation page connected in the Docs Hub', 'gpalab-guillotine' ),
        'resolve'     => function() {
          return 'world';
        },
        'type'        => 'String',
      )
    );
  }
}
