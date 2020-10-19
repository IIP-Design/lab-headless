<?php
/**
 * Registers the Styled_Blocks class.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */

namespace Guillotine;

/**
 * Describes the schema for the content blocks provided by the Styled Block Builder plugin.
 *
 * @package GPALAB_Headless\Guillotine
 * @since 0.0.1
 */
class Styled_Blocks {

  /** Primitive types. */

  /**
   * Describes the schema for a article.
   *
   * @since 0.0.1
   */
  public function article_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'postId' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'source' => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a button.
   *
   * @since 0.0.1
   */
  public function button_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'addPrefix'    => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'buttonArrow'  => array(
          'type'        => 'String',
          'description' => '',
        ),
        'buttonBorder' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'buttonColor'  => array(
          'type'        => 'String',
          'description' => '',
        ),
        'buttonLink'   => array(
          'type'        => 'String',
          'description' => '',
        ),
        'buttonPrefix' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'buttonText'   => array(
          'type'        => 'String',
          'description' => '',
        ),
        'id'           => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a file.
   *
   * @since 0.0.1
   */
  public function file_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'alt'      => array(
          'type'        => 'String',
          'description' => '',
        ),
        'filename' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'name'     => array(
          'type'        => 'String',
          'description' => '',
        ),
        'url'      => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a video block.
   *
   * @since 0.0.1
   */
  public function video_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'description' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'id'          => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'       => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /** Simple types. */

  /**
   * Describes the schema for a timeline event.
   *
   * @since 0.0.1
   */
  public function event_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'id'   => array(
          'type'        => 'String',
          'description' => '',
        ),
        'text' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'year' => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for an animated line.
   *
   * @since 0.0.1
   */
  public function line_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'id'   => array(
          'type'        => 'String',
          'description' => '',
        ),
        'text' => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a link.
   *
   * @since 0.0.1
   */
  public function link_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'id'       => array(
          'type'        => 'String',
          'description' => '',
        ),
        'linkUrl'  => array(
          'type'        => 'String',
          'description' => '',
        ),
        'linkText' => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a nav item.
   *
   * @since 0.0.1
   */
  public function nav_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'files' => array(
          'type'        => array( 'list_of' => 'fileMeta' ),
          'description' => '',
        ),
        'link'  => array(
          'type'        => 'String',
          'description' => '',
        ),
        'text'  => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a resource item.
   *
   * @since 0.0.1
   */
  public function resource_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'articles' => array(
          'type'        => array( 'list_of' => 'articleMeta' ),
          'description' => '',
        ),
        'buttons'  => array(
          'type'        => array( 'list_of' => 'buttonMeta' ),
          'description' => '',
        ),
        'id'       => array(
          'type'        => 'String',
          'description' => '',
        ),
        'tab'      => array(
          'type'        => 'String',
          'description' => '',
        ),
        'text'     => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'    => array(
          'type'        => 'String',
          'description' => '',
        ),
        'videos'   => array(
          'type'        => array( 'list_of' => 'videoMeta' ),
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a slide.
   *
   * @since 0.0.1
   */
  public function slide_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'files'    => array(
          'type'        => array( 'list_of' => 'fileMeta' ),
          'description' => '',
        ),
        'id'       => array(
          'type'        => 'String',
          'description' => '',
        ),
        'subtitle' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'text'     => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a stat.
   *
   * @since 0.0.1
   */
  public function stat_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'desc'   => array(
          'type'        => 'String',
          'description' => '',
        ),
        'id'     => array(
          'type'        => 'String',
          'description' => '',
        ),
        'number' => array(
          'type'        => 'Integer',
          'description' => '',
        ),
        'prefix' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'unit'   => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /** Compound types. */

  /**
   * Describes the schema for a article-feed block.
   *
   * @since 0.0.1
   */
  public function article_feed_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'articles'        => array(
          'type'        => array( 'list_of' => 'articleMeta' ),
          'description' => '',
        ),
        'blockBackground' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'fullWidth'       => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'subtitle'        => array(
          'type'        => 'String',
          'description' => '',
        ),
        'textColor'       => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'           => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a hero block.
   *
   * @since 0.0.1
   */
  public function hero_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'align'       => array(
          'type'        => 'String',
          'description' => '',
        ),
        'buttons'     => array(
          'type'        => array( 'list_of' => 'buttonMeta' ),
          'description' => '',
        ),
        'description' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'files'       => array(
          'type'        => array( 'list_of' => 'fileMeta' ),
          'description' => '',
        ),
        'lines'       => array(
          'type'        => array( 'list_of' => 'lineMeta' ),
          'description' => '',
        ),
        'subtitle'    => array(
          'type'        => 'String',
          'description' => '',
        ),
        'textColor'   => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'       => array(
          'type'        => 'String',
          'description' => '',
        ),
        'type'        => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a link list block.
   *
   * @since 0.0.1
   */
  public function link_list_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'backgroundGradient' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'backgroundType'     => array(
          'type'        => 'String',
          'description' => '',
        ),
        'blockBackground'    => array(
          'type'        => 'String',
          'description' => '',
        ),
        'files'              => array(
          'type'        => array( 'list_of' => 'fileMeta' ),
          'description' => '',
        ),
        'fullWidth'          => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'linkColor'          => array(
          'type'        => 'String',
          'description' => '',
        ),
        'linkStyle'          => array(
          'type'        => 'String',
          'description' => '',
        ),
        'links'              => array(
          'type'        => array( 'list_of' => 'linkMeta' ),
          'description' => '',
        ),
        'title'              => array(
          'type'        => 'String',
          'description' => '',
        ),
        'titleColor'         => array(
          'type'        => 'String',
          'description' => '',
        ),
        'twitter'            => array(
          'type'        => 'String',
          'description' => '',
        ),
        'facebook'           => array(
          'type'        => 'String',
          'description' => '',
        ),
        'instagram'          => array(
          'type'        => 'String',
          'description' => '',
        ),
        'youtube'            => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a navigation block.
   *
   * @since 0.0.1
   */
  public function navigation_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'fullWidth' => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'nav'       => array(
          'type'        => array( 'list_of' => 'navMeta' ),
          'description' => '',
        ),
        'title'     => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a parallax block.
   *
   * @since 0.0.1
   */
  public function parallax_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'buttons'   => array(
          'type'        => array( 'list_of' => 'buttonMeta' ),
          'description' => '',
        ),
        'desc'      => array(
          'type'        => 'String',
          'description' => '',
        ),
        'files'     => array(
          'type'        => array( 'list_of' => 'fileMeta' ),
          'description' => '',
        ),
        'fullWidth' => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'subtitle'  => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'     => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a quote box block.
   *
   * @since 0.0.1
   */
  public function quote_box_schema() {
    return array(
      'description' => __( 'Something something blocks', 'gpalab-guillotine' ),
      'fields'      => array(
        'articles'           => array(
          'type'        => array( 'list_of' => 'articleMeta' ),
          'description' => '',
        ),
        'backgroundGradient' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'backgroundType'     => array(
          'type'        => 'String',
          'description' => '',
        ),
        'blockBackground'    => array(
          'type'        => 'String',
          'description' => '',
        ),
        'desc'               => array(
          'type'        => 'String',
          'description' => '',
        ),
        'files'              => array(
          'type'        => array( 'list_of' => 'fileMeta' ),
          'description' => '',
        ),
        'fullWidth'          => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'quote'              => array(
          'type'        => 'String',
          'description' => '',
        ),
        'quoteBackground'    => array(
          'type'        => 'String',
          'description' => '',
        ),
        'subtitle'           => array(
          'type'        => 'String',
          'description' => '',
        ),
        'textColor'          => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'              => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a resources block.
   *
   * @since 0.0.1
   */
  public function resources_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'fullWidth' => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'resources' => array(
          'type'        => array( 'list_of' => 'resourceMeta' ),
          'description' => '',
        ),
        'subtitle'  => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'     => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a slides block.
   *
   * @since 0.0.1
   */
  public function slides_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'slides'        => array(
          'type'        => array( 'list_of' => 'slideMeta' ),
          'description' => '',
        ),
        'subTitleColor' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'         => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a stats block.
   *
   * @since 0.0.1
   */
  public function stats_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'backgroundType'  => array(
          'type'        => 'String',
          'description' => '',
        ),
        'blockBackground' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'files'           => array(
          'type'        => array( 'list_of' => 'fileMeta' ),
          'description' => '',
        ),
        'fullWidth'       => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'stats'           => array(
          'type'        => array( 'list_of' => 'statMeta' ),
          'description' => '',
        ),
        'textColor'       => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'           => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a text block.
   *
   * @since 0.0.1
   */
  public function text_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'articles'           => array(
          'type'        => array( 'list_of' => 'articleMeta' ),
          'description' => '',
        ),
        'backgroundGradient' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'backgroundType'     => array(
          'type'        => 'String',
          'description' => '',
        ),
        'blockBackground'    => array(
          'type'        => 'String',
          'description' => '',
        ),
        'buttons'            => array(
          'type'        => array( 'list_of' => 'buttonMeta' ),
          'description' => '',
        ),
        'desc'               => array(
          'type'        => 'String',
          'description' => '',
        ),
        'files'              => array(
          'type'        => array( 'list_of' => 'fileMeta' ),
          'description' => '',
        ),
        'fullWidth'          => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'subtitle'           => array(
          'type'        => 'String',
          'description' => '',
        ),
        'textColor'          => array(
          'type'        => 'String',
          'description' => '',
        ),
        'title'              => array(
          'type'        => 'String',
          'description' => '',
        ),
        'videos'             => array(
          'type'        => array( 'list_of' => 'videoMeta' ),
          'description' => '',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a timeline block.
   *
   * @since 0.0.1
   */
  public function timeline_schema() {
    return array(
      'description' => '',
      'fields'      => array(
        'fullWidth' => array(
          'type'        => 'Boolean',
          'description' => '',
        ),
        'timeline'  => array(
          'type'        => array( 'list_of' => 'eventMeta' ),
          'description' => '',
        ),
        'title'     => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }
}
