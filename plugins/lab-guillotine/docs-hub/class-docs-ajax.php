<?php
/**
 * Registers the Docs_Ajax class.
 *
 * @package Guillotine\Docs_Hub
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Handles calls to the WordPress admin AJAX.
 *
 * @package Guillotine\Docs_Hub
 * @since 0.0.1
 */
class Docs_Ajax {

  /**
   * Save repository data to the database.
   *
   * @since 0.0.1
   */
  public function handle_add_repo() {
    // The following rules are handled by the gpalab_verify_nonce function and hence can be safely ignored.
    // phpcs:disable WordPress.Security.NonceVerification.Missing
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.MissingUnslash
    // phpcs:disable WordPress.Security.ValidatedSanitizedInput.InputNotValidated
    $this->gpalab_verify_nonce( $_POST['security'], 'gpalab_docs_hub_save' );

    $data = ! empty( $_POST['data'] ) ? json_decode( wp_unslash( $_POST['data'] ), true ) : array();
    // phpcs:enable

    // Construct the reference string for the repository source.
    $repo_data = ! empty( $data['repository'] ) ? $this->prep_connected_repos_option( $data['repository'] ) : '';

    // Add parent value to the array of connected repos.
    $repos = get_option( 'gpalab_guillotine_docs_hub_repos', array() );
    array_push( $repos, $repo_data );

    update_option( 'gpalab_guillotine_docs_hub_repos', $repos );

    // Iterate over the repo's doc pages, adding each to the DB.
    if ( ! empty( $data['files'] ) && is_array( $data['files'] ) ) {

      foreach ( $data['files'] as $file ) {

        $this->insert_docs_page( $file, $repo_data['parent'] );
      }
    }

    $response['repo'] = $repo_data;

    wp_send_json_success( $response, 200 );
  }

  /**
   * Sanitizes and normalizes repo data in preparation of saving it to the DB.
   *
   * @param object $repo_data   Repository data received from the AJAX call.
   * @return object             The sanitized repository data to be stored as an option.
   *
   * @since 0.0.1
   */
  private function prep_connected_repos_option( $repo_data ) {
    $owner  = ! empty( $repo_data['owner'] ) ? sanitize_text_field( $repo_data['owner'] ) : '';
    $repo   = ! empty( $repo_data['repo'] ) ? sanitize_text_field( $repo_data['repo'] ) : '';
    $subdir = ! empty( $repo_data['subdirectory'] ) ? sanitize_text_field( $repo_data['subdirectory'] ) : '';
    $branch = ! empty( $repo_data['branch'] ) ? sanitize_text_field( $repo_data['branch'] ) : '';

    $data['owner']  = $owner;
    $data['repo']   = $repo;
    $data['subdir'] = $subdir;
    $data['branch'] = $branch;
    $data['parent'] = $this->construct_parent_name( $owner, $repo, $subdir, $branch );
    $data['title']  = '' !== $subdir ? $repo . '/' . $subdir : $repo;

    return $data;
  }

  /**
   * Cobbles together a reference string for a given repository source.
   *
   * @param string $owner      The repository's owner.
   * @param string $repo       The repository's name.
   * @param string $subdir     The sub-directory within a repository.
   * @param string $branch     The repository's branch.
   * @return string            The combined path parts.
   *
   * @since 0.0.1
   */
  private function construct_parent_name( $owner, $repo, $subdir, $branch ) {
    $o = ! empty( $owner ) ? $owner . '/' : '';
    $r = ! empty( $repo ) ? $repo : '';
    $s = ! empty( $subdir ) ? '/' . $subdir : '';
    $b = ! empty( $branch ) ? '@' . $branch : '';

    $parent = $o . $r . $s . $b;

    return $parent;
  }

  /**
   * Adds an entry for the provided docs page to the database.
   *
   * @param array  $page_array   The data for a given documentation page.
   * @param string $parent      A representation of the path to the source of the given docs page.
   *
   * @since 0.0.1
   */
  private function insert_docs_page( $page_array, $parent = '' ) {
    global $wpdb;

    $content  = sanitize_textarea_field( $page_array['content'] );
    $name     = sanitize_text_field( $page_array['name'] );
    $oid      = sanitize_text_field( $page_array['oid'] );
    $path     = sanitize_text_field( $page_array['path'] );
    $selected = rest_sanitize_boolean( $page_array['selected'] );
    $created  = gmdate( 'Y-m-d H:i:s' );

    $query = $wpdb->prepare(
      "INSERT INTO {$wpdb->prefix}gpalab_docs_hub (page_content, page_name, page_oid, page_path, parent, included, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s);",
      $content,
      $name,
      $oid,
      $path,
      $parent,
      $selected,
      $created
    );

    // phpcs:disable WordPress.DB.DirectDatabaseQuery.NoCaching
    // phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery
    // phpcs:disable WordPress.DB.PreparedSQL.NotPrepared
    return $wpdb->query( $query );
    // phpcs:enable
  }

  /**
   * Checks that a security nonce is set, valid, and from a permitted referrer.
   *
   * @param string $security   A nonce provided in the Ajax call.
   * @param string $expected   The expected nonce value.
   *
   * @since 0.0.1
   */
  private function gpalab_verify_nonce( $security, $expected ) {
    $nonce = null;

    // Make sure nonce is set.
    if ( ! isset( $security ) ) {
      return;
    } else {
      $nonce = sanitize_text_field( wp_unslash( $security ) );
    }

    // Verify the nonce.
    if (
      wp_verify_nonce( $nonce, $expected ) === false ||
      check_ajax_referer( $expected, 'security', false ) === false
    ) {
      return;
    }
  }
}
