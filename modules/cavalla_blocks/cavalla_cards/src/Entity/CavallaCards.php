<?php

/**
 * @file
 * Contains \Drupal\cavalla_cards\Entity\CavallaCards.
 *
 * @category Drupal
 * @package  cavalla_cards
 * @author   Ben Collins <bcolli31@gmail.com>
 * @license  GNU General Public License, version 2 or later
 * @link     https://www.example.com
 */

namespace Drupal\cavalla_cards\Entity;

use Drupal\cavalla\CavallaBase;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\media\Entity\Media;


/**
 * Defines the CavallaCards class.
 *
 * Cavalla Cards entity for handling paragraph bundles.
 */
class CavallaCards extends CavallaBase {

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
            $card = Paragraph::load($paragraph['target_id']);
            if ($card) {
                 
                // Build the array with content.
                $arr[] = [
                    'eyebrow' => $card->field_cavalla_card__ceyebrow->value ?? "",
                    'header' => $card->field_cavalla_card__cheader->value ?? "",
                    'body' => $card->field_cavalla_card__cbody->value ?? "",
                    'link' => !empty($card->field_cavalla_card__clink) ? \Drupal::service('cavalla.services')->getLink($card->field_cavalla_card__clink->getValue())[0] : [],
                ];
            }
        }

        return $arr;
    }

}
