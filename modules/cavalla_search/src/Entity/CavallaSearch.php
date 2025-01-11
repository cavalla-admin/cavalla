<?php

namespace Drupal\cavalla_search\Entity;

use Drupal\cavalla\CavallaBase;
use Drupal\Core\Url;
use Drupal\cavalla\Entity\Cavalla;



/**
 * Cavalla Search Entity Class.
 */
class CavallaSearch  {

  /**
   * Converts json to node object.
   */
  public function getsSearchResults($api) {
    $json = file_get_contents($api);
    $dataObj = json_decode($json)->data;
 
    $options = ['absolute' => TRUE];
    $arr = [];

    foreach ($dataObj as $key => $data) {
      $arr[$key]['id'] = $data->attributes->drupal_internal__nid;
      $arr[$key]['title'] = $data->attributes->title;
      $arr[$key]['node_link'] = Url::fromRoute('entity.node.canonical', ['node' => $data->attributes->drupal_internal__nid], $options)->toString();
    }
    return $arr;
  }


}