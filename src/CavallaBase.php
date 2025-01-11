<?php

namespace Drupal\cavalla;



abstract class CavallaBase implements CavallaInterface {

  public function __construct() {}

  /**
   * Instantiates a new class instance.
   *
   * @return static
   *   Returns a new instance of the class.
   */
  public static function getInstance() {
    return new static();
  }

   /**
   * Returns an Entity Array.
   *
   * @param array $nids
   *   The entity type ID for this storage.
   *
   * @return array
   *   An array of node values.
   */
  public function getValue(array $nids){}


  
}
