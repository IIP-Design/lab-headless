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
        'description' => __( 'A list of documentation pages connected in the Docs Hub', 'gpalab-guillotine' ),
        'args'        => array(
          'parent' => array(
            'description' => __( 'Specify page source in the format "owner/repo/sub-directory@branch"', 'gpalab-guillotine' ),
            'type'        => array( 'non_null' => 'String' ),
            'required'    => true,
          ),
        ),
        'resolve'     => function( $root, $args ) {
          return $this->gpalab_docs_pages_resolver( $root, $args );
        },
        'type'        => array( 'list_of' => 'gpalabDocsPage' ),
      )
    );
  }

  /**
   * Resolve queries for documentation pages based on the parent string.
   *
   * @param null  $root  The previous object/array was being resolved. Our field is at the Root, so it’s passed a null value.
   * @param array $args  The input values from provided by the user to be passed into the query.
   * @return array       Results from the database query.
   *
   * @since 0.0.1
   */
  private function gpalab_docs_pages_resolver( $root, $args ) {
    global $wpdb;

    // phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery
    // phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
    $results = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}gpalab_docs_hub WHERE `parent` = %s",
        $args['parent']
      )
    );
    // phpcs:enable

    $transformed = array();

    if ( ! empty( $results ) ) {

      foreach ( $results as $result ) {
        $item['pageContent'] = $result->page_content;
        $item['pageId']      = $result->page_id;
        $item['pageName']    = $result->page_name;
        $item['pageOID']     = $result->page_oid;
        $item['pagePath']    = $result->page_path;
        $item['parent']      = $result->parent;

        array_push( $transformed, $item );
      }
    }

    return $transformed;
  }
}
