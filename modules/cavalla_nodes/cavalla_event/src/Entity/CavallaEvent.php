<?php

namespace Drupal\cavalla_event\Entity;

use Drupal\Core\Url;
use Drupal\taxonomy\Entity\Term;
use Drupal\country_state_city\Entity\CountryList;
use Drupal\country_state_city\Entity\StateList;
use Drupal\cavalla\Entity\Cavalla;



/**
 * Cavalla Event Entity Class.
 */
class CavallaEvent  {

  /**
   * Converts json to events object.
   */
  public static function getEvents($api) {
    $json = file_get_contents($api);
    $dataObj = json_decode($json)->data;
 
    $options = ['absolute' => TRUE];
    $date_formatter = \Drupal::service('date.formatter');
    $arr = [];

    foreach ($dataObj as $key => $data) {
      $date = $data->attributes->field_cavalla_event__date;
      $end_date = $data->attributes->field_cavalla_event__end_date;

      $arr[$key]['id'] = $data->attributes->drupal_internal__nid;
      $arr[$key]['image'] = Cavalla::getInstance()->getMediaUrlByMid($data->relationships->field_cavalla_event__image->data->meta->drupal_internal__target_id);
      $arr[$key]['title'] = $data->attributes->title;
      $arr[$key]['node_link'] = Url::fromRoute('entity.node.canonical', ['node' => $data->attributes->drupal_internal__nid], $options)->toString();
      $arr[$key]['address'] = $data->attributes->field_cavalla_event__address;
      $arr[$key]['country'] = !is_null(CountryList::load($data->attributes->field_cavalla_event__location->country)->getName()) ? CountryList::load($data->attributes->field_cavalla_event__location->country)->getName() : '' ;
      $arr[$key]['state'] = StateList::load($data->attributes->field_cavalla_event__location->state)->getName();
      $arr[$key]['state_id'] = $data->attributes->field_cavalla_event__location->state;
      $arr[$key]['event_link'] = $data->attributes->field_cavalla_event__link;
      $arr[$key]['price'] = $data->attributes->field_cavalla_event__price;
      $arr[$key]['description'] = !empty( $data->attributes->field_cavalla_event__desc->value ) ? $data->attributes->field_cavalla_event__desc->value : '';
      $arr[$key]['start_date'] = $date_formatter->format(strtotime($date), 'custom', 'M d, Y g:i A');
      $arr[$key]['end_date'] = $date_formatter->format(strtotime($end_date), 'custom', 'M d, Y g:i A');
    }
    return $arr;
  }


  /**
   * Loads events Term name.
  */

  public function getEventsByTerm($term_name) {

    $term_obj = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadByProperties(['name' => $term_name]);
    $tid = array_keys($term_obj)[0];

    $api = Cavalla::getInstance()->getBaseUrl() . "/jsonapi/node/cavalla_event?filter[field_cavalla_event__tags.meta.drupal_internal__target_id]=". $tid;
  
    return self::getEvents($api);
  }                        


  /**
   * Loads events tags by Term id.
  */
  public function getEventTags($tids) {
    $arr = [];
    $arr1 = [];
    if (!empty($tids)){
      foreach ($tids as $num => $value) {
        $arr1['target_id'][$num] = $value['target_id'];
        $term = term::loadMultiple($arr1['target_id']);
        
        $aliasManager = \Drupal::service('path_alias.manager');
        if (!empty($term)) {
          foreach ($term as $num => $value) {
            $arr[$num]['title'] = $value->get('name')->value;
            $arr[$num]['pathname'] = Cavalla::getInstance()->getBaseUrl(). $aliasManager->getAliasByPath('/taxonomy/term/' . $value->tid->value);
          }
        }
      }
    }
    
    return $arr;
  }


  /**
  * Loads event locations.
  */

  public static function getEventLocation($term_name) {
    $events = self::getEvents($term_name);
    $locations = [];
    foreach($events as $key => $event){
        $locations[$key]['state'] = $event['state'];
        $locations[$key]['state_id'] = $event['state_id'];
    }
    return $locations;

  }



}