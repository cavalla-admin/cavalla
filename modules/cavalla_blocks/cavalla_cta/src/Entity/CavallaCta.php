<?php

namespace Drupal\cavalla_cta\Entity;

use Drupal\cavalla\CavallaBase;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Defines the CavallaCta class.
 *
 * Cavalla CTA entity for handling paragraph bundles.
 */
class CavallaCta extends CavallaBase {

  /**
   * Retrieves content from the Paragraph Bundle.
   *
   * @param array $entity
   *   The Paragraph Bundle.
   *
   * @return array
   *   Returns an associative array containing block content from the Paragraph Bundle.
   */
  public function getValue(array $entity) {
    $arr = [];

    // Retrieve the target IDs for copy and media fields.
    $copy_tid = !is_null($entity->field_cavalla_hero__copy) ? $entity->field_cavalla_hero__copy->target_id : '';
    $media_tid = !is_null($entity->field_cavalla_hero__media) ? $entity->field_cavalla_hero__media->target_id : '';

    // Populate the array with values from the copy field.
    $arr[0]['eyebrow'] = Paragraph::load($copy_tid)->field_cavalla_copy__eyebrow->value;
    $arr[0]['header'] = Paragraph::load($copy_tid)->field_cavalla_copy__header->value;
    $arr[0]['text'] = Paragraph::load($copy_tid)->field_cavalla_copy__subtext->value;

    // Populate the array with the media field value.
    $arr[0]['media'] = !empty($media_tid) ? Paragraph::load($media_tid)->field_cavalla_hero__media->value : '';
    

    return $arr;
  }

}
