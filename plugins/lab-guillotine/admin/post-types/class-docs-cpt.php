<?php
/**
 * Registers the Docs_CPT class.
 *
 * @package Guillotine\Docs_CPT
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Register the documentation custom post type.
 * This post type is intended to provide a platform for writing technical documentation.
 *
 * @package Guillotine\Docs_CPT
 * @since 0.0.1
 */
class Docs_CPT {

  /**
   * Register the Documentation Page custom post type.
   */
  public function register_docs_cpt() {
    $capabilities = array(
      'edit_posts'             => 'edit_docs',
      'edit_others_posts'      => 'edit_others_docs',
      'edit_private_posts'     => 'edit_private_docs',
      'edit_published_posts'   => 'edit_published_docs',
      'delete_posts'           => 'delete_docs',
      'delete_others_posts'    => 'delete_others_docs',
      'delete_private_posts'   => 'delete_private_docs',
      'delete_published_posts' => 'delete_published_docs',
      'read_private_posts'     => 'read_private_docs',
      'publish_posts'          => 'delete_docs',
    );

    $labels = array(
      'name'                     => _x( 'Docs', 'General name for the Docs post type', 'gpalab-guillotine' ),
      'singular_name'            => _x( 'Documentation Page', 'Name one instance of Docs post type', 'gpalab-guillotine' ),
      'add_new'                  => _x( 'Add New Docs', 'Docs post type', 'gpalab-guillotine' ),
      'add_new_item'             => _x( 'Add New Docs', 'For adding a singular Docs page', 'gpalab-guillotine' ),
      'all_items'                => __( 'All Docs', 'gpalab-guillotine' ),
      'archives'                 => __( 'Documentation Archives', 'gpalab-guillotine' ),
      'attributes'               => __( 'Documentation Attributes', 'gpalab-guillotine' ),
      'edit_item'                => __( 'Edit Docs', 'gpalab-guillotine' ),
      'filter_items_list'        => __( 'Filter docs list', 'gpalab-guillotine' ),
      'insert_into_item'         => __( 'Insert into Docs', 'gpalab-guillotine' ),
      'item_published'           => __( 'Docs published.', 'gpalab-guillotine' ),
      'item_published_privately' => __( 'Docs published privately.', 'gpalab-guillotine' ),
      'item_reverted_to_draft'   => __( 'Docs reverted to draft.', 'gpalab-guillotine' ),
      'item_scheduled'           => __( 'Doc scheduled for publication.', 'gpalab-guillotine' ),
      'item_updated'             => __( 'Docs updated.', 'gpalab-guillotine' ),
      'items_list'               => __( 'Docs list', 'gpalab-guillotine' ),
      'items_list_navigation'    => __( 'Docs list navigation', 'gpalab-guillotine' ),
      'menu_name'                => _x( 'Docs', 'Name in admin menu for the Docs post type', 'gpalab-guillotine' ),
      'new_item'                 => __( 'New Docs', 'gpalab-guillotine' ),
      'not_found'                => __( 'No docs found', 'gpalab-guillotine' ),
      'not_found_in_trash'       => __( 'No docs found in Trash', 'gpalab-guillotine' ),
      'search_items'             => __( 'Search Docs', 'gpalab-guillotine' ),
      'uploaded_to_this_item'    => __( 'Uploaded to docs', 'gpalab-guillotine' ),
      'view_item'                => __( 'View Docs', 'gpalab-guillotine' ),
      'view_items'               => __( 'View Documentation Pages', 'gpalab-guillotine' ),
    );

    $rewrite = array(
      'feeds'      => true,
      'pages'      => true,
      'slug'       => 'docs',
      'with_front' => true,
    );

    $supports = array( 'author', 'editor', 'excerpt', 'revisions', 'title' );

    $args = array(
      'can_export'            => true,
      'capability_type'       => 'doc',
      'capabilities'          => $capabilities,
      'delete_with_user'      => true,
      'exclude_from_search'   => false,
      'description'           => '',
      'has_archive'           => true,
      'hierarchical'          => false,
      'labels'                => $labels,
      'map_meta_cap'          => true,
      'menu_icon'             => 'dashicons-media-code',
      'menu_position'         => null,
      'public'                => true,
      'publicly_queryable'    => true,
      'query_var'             => 'docs',
      'register_meta_box_cb'  => null,
      'rest_base'             => 'docs',
      'rest_controller_class' => 'WP_REST_Posts_Controller',
      'rewrite'               => $rewrite,
      'show_ui'               => true,
      'show_in_admin_bar'     => true,
      'show_in_menu'          => true,
      'show_in_nav_menus'     => true,
      'show_in_rest'          => true,
      'supports'              => $supports,
      'taxonomies'            => array(),
      'graphql_plural_name'   => 'docs', // Non-core property, required by WPGraphQL.
      'graphql_single_name'   => 'doc', // Non-core property, required by WPGraphQL.
      'show_in_graphql'       => true, // Non-core property, required by WPGraphQL.
    );

    register_post_type( 'gpalab-docs', $args );
  }
}
