<?php

namespace Drupal\cavalla\Entity;

use Drupal\cavalla\CavallaBase;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;
use Drupal\Core\Url;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\menu_link_content\Entity\MenuLinkContent;

/**
 * Retrieves Cavalla Utility Classes.
 */
class Cavalla extends CavallaBase {

  /**
   * Load content by Media field.
   *
   * @param string $target_id
   *   The target paragraph entity ID.
   *
   * @return array
   *   Array of paragraph field values.
   */
  public function getCopy(string $target_id): array {
    $arr = [];

    // Load the paragraph entity using the target ID.
    $copy = Paragraph::load($target_id);

    // Process the paragraph entity if it exists.
    if ($copy) {
      $arr = [
        'eyebrow' => $copy->field_cavalla_eyebrow_text->value ?? "",
        'header' => $copy->field_cavalla_header__text->value ?? "",
        'body' => $copy->field_cavalla_body->value ?? "",
      ];
    }

    return $arr;
  }

  /**
   * Returns absolute link from node URI.
   *
   * @param array $uri_object
   *   The URI object of selected nodes.
   *
   * @return array
   *   Array with node's absolute link and link title.
   */
  public function getLink(array $uri_object): array {
    $links = [];

    // Extract valid target IDs and batch load entities.
    $target_ids = array_column($uri_object, 'target_id');
    $paragraphs = Paragraph::loadMultiple($target_ids);

    foreach ($paragraphs as $paragraph) {
      if ($paragraph && $paragraph->hasField('field_cavalla_link__link')) {
        $link_value = $paragraph->field_cavalla_link__link->getValue();
        $uri = $link_value[0]['uri'] ?? '';
        $links[] = [
          'uri' => $this->processUri($uri),
          'title' => $link_value[0]['title'] ?? '',
        ];
      }
    }

    return $links;
  }

  /**
   * Processes a URI and converts it to an absolute URL if necessary.
   *
   * @param string $uri
   *   The URI to process.
   *
   * @return string
   *   The processed absolute URL or the original URI if no conversion was needed.
   */
  protected function processUri(string $uri): string {
    $options = ['absolute' => TRUE];

    try {
      if (str_starts_with($uri, 'entity:')) {
        $nid = str_replace('entity:node/', '', $uri);
        $uri = Url::fromRoute('entity.node.canonical', ['node' => $nid], $options)->toString();
      } elseif (str_starts_with($uri, 'internal:')) {
        $uri = str_replace('internal:', '', $uri);
      }
    } catch (\Exception $e) {
      \Drupal::logger('cavalla')->error('Error processing URI: @message', ['@message' => $e->getMessage()]);
      $uri = '';
    }

    return $uri;
  }

  /**
   * Loads a media entity and retrieves image details.
   *
   * @param int $media_id
   *   The ID of the media entity to load.
   *
   * @return array
   *   An associative array with image or video details, or an empty array.
   */
  public function loadMedia(int $media_id): array {
    $entity = Media::load($media_id);

    if ($entity && $entity->hasField('field_media_image') && !$entity->get('field_media_image')->isEmpty()) {
      return [
        'url' => \Drupal::service('file_url_generator')->generateAbsoluteString($entity->field_media_image->entity->getFileUri()) ?? '',
        'alt' => $entity->get('field_media_image')->alt ?? '',
      ];
    }
    if ($entity && $entity->hasField('field_media_oembed_video') && !$entity->get('field_media_oembed_video')->isEmpty()) {
      return [
        'url' => $this->getVideoEmbedUrl($entity->field_media_oembed_video->value),
        'bundle' => $entity->bundle(),
        'title' => $entity->name->value,
      ];
    }

    return [];
  }

  /**
   * Truncates text to a specified word limit.
   *
   * @param string $text
   *   The input text.
   * @param int $limit
   *   Word limit.
   *
   * @return string
   *   Truncated text with ellipsis.
   */
  public function getTruncatedText(string $text, int $limit): string {
    if (str_word_count($text, 0) > $limit) {
      $words = str_word_count($text, 2);
      $pos = array_keys($words);
      $text = substr($text, 0, $pos[$limit]) . '...';
    }

    return $text;
  }

  /**
   * Returns the site's base URL.
   *
   * @return string
   *   The site's base URL.
   */
  public function getBaseUrl(): string {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https://' : 'http://';
    $hostName = filter_var($_SERVER['HTTP_HOST'], FILTER_SANITIZE_STRING);
    return rtrim($protocol . $hostName, '/') . '/';
  }

  /**
   * Extracts the embed URL from a video link (YouTube/Vimeo).
   *
   * @param string $url
   *   The video URL.
   *
   * @return string
   *   The embed URL or an empty string.
   */
  public function getVideoEmbedUrl(string $url): string {
    $youtube_pattern = '/(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]+)/';
    $vimeo_pattern = '/vimeo\.com\/(\d+)/';

    if (preg_match($youtube_pattern, $url, $matches)) {
      return "https://www.youtube.com/embed/" . $matches[1];
    }
    if (preg_match($vimeo_pattern, $url, $matches)) {
      return "https://player.vimeo.com/video/" . $matches[1];
    }

    return '';
  }

  /**
   * Retrieves a menu's items with title, URL, and description.
   *
   * @param string $menu_name
   *   The machine name of the menu.
   *
   * @return array
   *   Menu items as an array.
   */
  public function getMenu(string $menu_name): array {
    $menu_tree = \Drupal::menuTree();
    $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_name);
    $parameters->setMinDepth(0)->onlyEnabledLinks();
    $tree = $menu_tree->load($menu_name, $parameters);

    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];
    $tree = $menu_tree->transform($tree, $manipulators);

    $menu_items = [];
    foreach ($tree as $item) {
      $menu_items[] = [
        'title' => $item->link->getTitle(),
        'url' => $item->link->getUrlObject()->toString(),
        'description' => $item->link->getDescription() ?? '',
      ];
    }

    return $menu_items;
  }
}
