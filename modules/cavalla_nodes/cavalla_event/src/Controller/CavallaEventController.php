<?php

namespace Drupal\cavalla_event\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\cavalla\Entity\Cavalla;
use Drupal\cavalla_event\Entity\CavallaEvent;


/**
 * Cavalla Event Controller .
 */
class CavallaEventController extends CavallaEvent{

  /**
   * Loads events by event filter.
   */
  public function eventsByFilter($term_name, $filter) {

    parse_str($filter, $output);

    $term_obj = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadByProperties(['name' => $term_name]);
    $tid = array_keys($term_obj)[0];

    $title = !empty($output['title']) ? "&filter[title][operator]=CONTAINS&filter[title][value]=" . $output['title']: "";
    $state = !empty($output['state']) ? "&filter[field_cavalla_event__location.state]=". $output['state'] : "";
   // $price = empty($output['price']) ?  "&filter[price]= Null" : "";

    $api = Cavalla::getInstance()->getBaseUrl() . "/jsonapi/node/cavalla_event?filter[field_cavalla_event__tags.meta.drupal_internal__target_id]=". $tid . $state  . $title;
  
    return new JsonResponse($this->getEvents($api));
  }



}
