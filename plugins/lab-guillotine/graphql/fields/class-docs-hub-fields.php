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
  public function register_docs_hub_fields() {
    register_graphql_field(
      'RootQuery',
      'gpalabDocsPages',
      array(
        'description' => __( 'A list of documentation pages connected through the Docs Hub', 'gpalab-guillotine' ),
        'args'        => array(
          'parent' => array(
            'description' => __( 'Specify page source in the format "owner/repo/sub-directory@branch"', 'gpalab-guillotine' ),
            'type'        => array( 'non_null' => 'String' ),
          ),
        ),
        'resolve'     => function( $root, $args ) {
          return $this->gpalab_docs_pages_resolver( $root, $args );
        },
        'type'        => array( 'list_of' => 'GpalabDocsPage' ),
      )
    );

    register_graphql_field(
      'RootQuery',
      'gpalabDocsRepo',
      array(
        'description' => __( 'The data for a given documentation repository.', 'gpalab-guillotine' ),
        'args'        => array(
          'slug' => array(
            'description' => __( 'Specify the repo slug to search for amongst the list of all repos.', 'gpalab-guillotine' ),
            'type'        => array( 'non_null' => 'String' ),
          ),
        ),
        'resolve'     => function( $root, $args ) {
          return $this->gpalab_docs_repo_resolver( $root, $args );
        },
        'type'        => 'GpalabDocsRepo',
      )
    );

    register_graphql_field(
      'RootQuery',
      'gpalabDocsRepos',
      array(
        'description' => __( 'A list of documentation repositories connected through the Docs Hub', 'gpalab-guillotine' ),
        'resolve'     => function() {
          return $this->gpalab_docs_repos_resolver();
        },
        'type'        => array( 'list_of' => 'GpalabDocsRepo' ),
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
        "SELECT * FROM {$wpdb->prefix}gpalab_docs_hub WHERE `parent` = %s AND `included` = 1",
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

  /**
   * Resolve queries for a single documentation repository.
   *
   * @param null  $root  The previous object/array was being resolved. Our field is at the Root, so it’s passed a null value.
   * @param array $args  The input values from provided by the user to be passed into the query.
   * @return object      Results from the database query.
   *
   * @since 0.0.1
   */
  private function gpalab_docs_repo_resolver( $root, $args ) {
    $slug      = $args['slug'];
    $all_repos = get_option( 'gpalab_guillotine_docs_hub_repos', array() );

    // Only return repo data matching the provided slug.
    $filtered = array_filter(
      $all_repos,
      function ( $arr ) use ( $slug ) {
        $normalized = $this->normalize_repo( $arr );

        return $normalized['slug'] === $slug;
      }
    );

    // Reset the array index values as array_filter preserves index values.
    $reset = reset( $filtered );

    return $this->normalize_repo( $reset );
  }

  /**
   * Resolve queries for documentation repositories.
   *
   * @since 0.0.1
   */
  private function gpalab_docs_repos_resolver() {
    $repos = get_option( 'gpalab_guillotine_docs_hub_repos', array() );

    $filtered = array();

    foreach ( $repos as $repo ) {
      $normalized = $this->normalize_repo( $repo );

      array_push( $filtered, $normalized );
    }

    return $filtered;
  }

  /**
   * Formats the repo data into the expected structure.
   *
   * @param object $repo  The raw repository data as stored in the database.
   * @return object       The formatted repo data for use on the frontend.
   *
   * @since 0.0.1
   */
  private function normalize_repo( $repo ) {
    $normalized['name']     = $repo['title'];
    $normalized['location'] = $repo['parent'];

    $normalized['slug'] = ! empty( $repo['subdir'] )
                        ? $repo['repo'] . '-' . str_replace( '/', '-', $repo['subdir'] )
                        : $repo['repo'];

    return $normalized;
  }
}
