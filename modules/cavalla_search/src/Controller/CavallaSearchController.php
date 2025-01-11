<?php

namespace Drupal\cavalla_search\Controller;

use Drupal\cavalla\Entity\Cavalla;
use Drupal\cavalla_search\Entity\CavallaSearch;
use Symfony\Component\HttpFoundation\JsonResponse;


/**
 * Cavalla Search Controller.
 */
class CavallaSearchController extends CavallaSearch {


  /**
   * Loads search results.
  */
  public function searchNodes($title) {

    $title = rawurlencode($title);
    $title = !empty($title) ? "filter[title][operator]=CONTAINS&filter[title][value]=" . $title: "";
    $api = Cavalla::getInstance()->getBaseUrl() . "jsonapi/node/cavalla_page?". $title;  
    return new JsonResponse($this->getsSearchResults($api));
  }



}