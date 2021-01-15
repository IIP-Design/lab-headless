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
      'description' => '',
      'fields'      => array(
        'pageId'      => array(
          'type'        => 'String',
          'description' => '',
        ),
        'pageContent' => array(
          'type'        => 'String',
          'description' => '',
        ),
        'pageName'    => array(
          'type'        => 'String',
          'description' => '',
        ),
        'pageOID'     => array(
          'type'        => 'String',
          'description' => '',
        ),
        'pagePath'    => array(
          'type'        => 'String',
          'description' => '',
        ),
        'parent'      => array(
          'type'        => 'String',
          'description' => '',
        ),
      ),
    );
  }
}
