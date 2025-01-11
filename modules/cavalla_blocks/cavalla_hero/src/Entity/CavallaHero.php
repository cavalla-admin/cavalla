<?php

/**
 * @file
 * Contains \Drupal\cavalla_hero\Entity\CavallaHero.
 *
 * @category Drupal
 * @package  cavalla_hero
 * @author   Ben Collins <bcolli31@gmail.com>
 * @license  GNU General Public License, version 2 or later
 * @link     https://www.example.com
 */

namespace Drupal\cavalla_hero\Entity;

use Drupal\cavalla\CavallaBase;
use Drupal\cavalla\Entity\Cavalla;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\media\Entity\Media;


/**
 * Defines the CavallaHero class.
 *
 * Cavalla Text and Media entity for handling paragraph bundles.
 */
class CavallaHero extends CavallaBase {

    /**
     * Retrieves content from the Paragraph Bundle.
     *
     * @param array $entity
     *   The Paragraph Bundle entities.
     *
     * @return array
     *   An associative array containing block content from the Paragraph Bundle.
     */
    public function getValue(array $entity) {
        
        $arr = [];

        foreach ($entity as $key => $paragraph) {
            // Load the paragraph entity.
       
        }

        return $arr;
      }

}
