<?php
/**
 * Registers the Docs_Hub_Schema class.
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
class Docs_Hub_Schema {

  /**
   * Describes the schema for a documentation page.
   *
   * @since 0.0.1
   */
  public function docs_page_schema() {
    return array(
      'description' => 'A GPA Lab documentation page type.',
      'fields'      => array(
        'pageId'      => array(
          'type'        => 'Int',
          'description' => 'A unique identifier for a documentation page.',
        ),
        'pageContent' => array(
          'type'        => 'String',
          'description' => 'The text content of a documentation page.',
        ),
        'pageName'    => array(
          'type'        => 'String',
          'description' => 'The filename of the documentation page.',
        ),
        'pageOID'     => array(
          'type'        => 'String',
          'description' => 'The git object id for the documentation page file.',
        ),
        'pagePath'    => array(
          'type'        => 'String',
          'description' => 'The file path to the documentation page within it\'s repository.',
        ),
        'parent'      => array(
          'type'        => 'String',
          'description' => 'A representation of the page\'s parent repository',
        ),
      ),
    );
  }

  /**
   * Describes the schema for a documentation repository.
   *
   * @since 0.0.1
   */
  public function docs_repo_schema() {
    return array(
      'description' => 'A GPA Lab documentation repository type.',
      'fields'      => array(
        'name' => array(
          'type'        => 'String',
          'description' => 'The simplified name of the repository.',
        ),
        'path' => array(
          'type'        => 'String',
          'description' => 'A representation of the location of the repository',
        ),
      ),
    );
  }
}
