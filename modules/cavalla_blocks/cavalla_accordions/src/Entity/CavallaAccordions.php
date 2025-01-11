<?php

/**
 * @file
 * Contains \Drupal\cavalla_accordions\Entity\CavallaAccordion.
 *
 * @category Drupal
 * @package  cavalla_accordions
 * @author   Ben Collins <bcolli31@gmail.com>
 * @license  GNU General Public License, version 2 or later
 * @link     https://www.example.com
 */
namespace Drupal\cavalla_accordions\Entity;

use Drupal\cavalla\CavallaBase;
use Drupal\paragraphs\Entity\Paragraph;

/**
 * Defines the CavallaAccordions class.
 *
 * Cavalla Accordions entity for handling paragraph bundles.
 */
class CavallaAccordions extends CavallaBase
{

    /**
     * Retrieves content from the Paragraph Bundle.
     *
     * @param $paragraphs
     *   The Paragraph Bundle.
     *
     * @return array
     *   Returns an associative array containing block content from the Paragraph Bundle.
     */
    public function getValue(array $paragraphs)
    {
        $arr = [];
        // Loop through the result set.
        foreach ($paragraphs as $key => $element) {
            
            $accordion = Paragraph::load($element['target_id']);

            if($accordion){

                $arr[] = [
                    'header' =>  $accordion->field_cavalla_accordions__ahead->value ?? "",
                    'body' => $accordion->field_cavalla_accordions__abody->value ?? "",
                ];
            }
        }

        return $arr;
    }

}
