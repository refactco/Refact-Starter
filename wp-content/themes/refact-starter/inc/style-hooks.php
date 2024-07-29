<?php
/**
 * Style Hooks
 *
 * @package Refact_Starter
 */
defined( 'ABSPATH' ) || exit;


function refact_custom_block_styles( string $block_content, array $block ): string {
  $theme_version = defined( 'THEME_VERSION' ) ? THEME_VERSION : '1.0.0';

  // Array of block names and corresponding CSS file names
  $block_styles = array(
    'core/button' => 'button.css',

    // Add more block styles here
    // 'block/name' => 'filename.css',
  );

  // Check if the block is in the array
  if ( array_key_exists( $block['blockName'], $block_styles ) ) {
    $style_file = $block_styles[$block['blockName']];
    wp_enqueue_style( 'refact-' . str_replace( '/', '-', $block['blockName'] ) . '-styles', get_theme_file_uri( "assets/styles/$style_file" ), array(), $theme_version );
  }

  return $block_content;
}

add_filter( 'render_block', 'refact_custom_block_styles', 10, 2 );
