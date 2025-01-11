<?php

/**
 * @file
 * Contains \Drupal\cavalla_carousels\Entity\CavallaCarousels.
 *
 * @category Drupal
 * @package  cavalla_carousels
 * @author   Ben Collins <bcolli31@gmail.com>
 * @license  GNU General Public License, version 2 or later
 * @link     https://www.example.com
 */

namespace Drupal\cavalla_carousels\Entity;

use Drupal\cavalla\Cavalla;
use Drupal\cavalla\CavallaBase;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Defines the CavallaCarousels class.
 *
 * Cavalla Carousels entity for handling paragraph bundles.
 */
class CavallaCarousels extends CavallaBase {



  /**
   * Retrieves content from the Paragraph Bundle.
   *
   * @param array $paragraphs
   *   The array of Paragraph references.
   *
   * @return array
   *   An associative array containing block content from the Paragraph Bundle.
   */
  public function getValue(array $paragraphs): array {
    $arr = [];

    // Loop through the result set.
    foreach ($paragraphs as $key => $element) {
      $slide = Paragraph::load($element['target_id']);

      if ($slide) {
        $arr[] = [
          'header' => $slide->get('field_cavalla_carousels__ch')->value ?? '',
          'text' => $slide->get('field_cavalla_carousels__ct')->value ?? '',
          'image' => !empty($slide->get('field_cavalla_carousels__cimg')->getValue()) ? \Drupal::service('cavalla.services')->loadMedia($slide->get('field_cavalla_carousels__cimg')->getValue()[0]['target_id']) : [],
        ];
      }
    }

    return $arr;
  }

}
