<?php
/**
 * Style Hooks
 *
 * @package Refact_Starter
 */
defined( 'ABSPATH' ) || exit;


/**
 * Add custom block styles
 */
function refact_custom_block_styles() {
  $theme_version = defined( 'THEME_VERSION' ) ? THEME_VERSION : '1.0.0';

  // Array of block names and corresponding CSS file names
  $block_styles = array(
    'core/button' => 'button.css',

    // Add more block styles here
    // 'block/name' => 'filename.css',
  );

  foreach ( $block_styles as $block_name => $style_file ) {
    $args = array(
      'handle'  => 'refact-starter-' . str_replace( '/', '-', $block_name ),
      'src'     => get_theme_file_uri( "assets/styles/blocks/$style_file" ),
      'ver'     => $theme_version,
      'path'    => get_theme_file_path( "assets/styles/blocks/$style_file" ),
    );
    wp_enqueue_block_style( $block_name, $args );
  }
}
add_filter( 'after_setup_theme', 'refact_custom_block_styles' );
