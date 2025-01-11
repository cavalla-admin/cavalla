<?php

/**
 * @file
 * Contains \Drupal\cavalla_tab\Entity\CavallaTab.
 *
 * @category Drupal
 * @package  Cavalla Tab
 * @license  GNU General Public License, version 2 or later
 * @link     https://www.example.com
 */

namespace Drupal\cavalla_tab\Entity;

use Drupal\cavalla\CavallaBase;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Defines the CavallaTab class.
 *
 * Cavalla Tab entity for handling paragraph bundles.
 */
class CavallaTab extends CavallaBase {


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

    foreach ($entity as $key => $panes) {
      $tab = Paragraph::load($panes['target_id']);

      if ($tab) {
        $arr[] = [
          'copy' => \Drupal::service('cavalla.services')->getCopy($tab->field_cavalla_tabs__contents->getValue()) ?? "",
          'icon' => \Drupal::service('cavalla.services')->getMedia($tab->field_cavalla_image__image->getValue()) ?? "",
        ];
      }
    }

    return $arr;
  }
}
