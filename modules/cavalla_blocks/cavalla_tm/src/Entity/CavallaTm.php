<?php

/**
 * @file
 * Contains \Drupal\cavalla_tm\Entity\CavallaTm.
 *
 * @category Drupal
 * @package  cavalla_tm
 * @author   Ben Collins <bcolli31@gmail.com>
 * @license  GNU General Public License, version 2 or later
 * @link     https://www.example.com
 */

namespace Drupal\cavalla_tm\Entity;

use Drupal\cavalla\CavallaBase;
use Drupal\cavalla\Entity\Cavalla;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Defines the CavallaTm class.
 *
 * Cavalla Text and Media entity for handling paragraph bundles.
 */
class CavallaTm extends CavallaBase {

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
            $textMedia = Paragraph::load($paragraph['target_id']);

            if ($textMedia->getType() === 'copy') {
                // Build the array with content.
                $arr[] = [
                    'copy' => [
                        'eyebrow' => $textMedia->field_cavalla_eyebrow_text->value ?? '',
                        'header'  => $textMedia->field_cavalla_header__text->value ?? '',
                        'body'    => $textMedia->field_cavalla_body->value ?? '',
                    ],
                ];
            }

            if ($textMedia->getType() === 'cavalla_media') {
                $arr[] = [
                    'media' => [
                        !empty($textMedia->field_cavalla_media__media[0]) 
                            ? Cavalla::getInstance()->loadMedia($textMedia->field_cavalla_media__media[0]->target_id) 
                            : [],
                    ],
                ];
            }
        }

        return $arr;
    }

}
