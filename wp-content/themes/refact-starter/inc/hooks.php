<?php
/**
 * Hooks
 *
 * @package Refact_Starter
 */
defined( 'ABSPATH' ) || exit;

/*
* Register the blocks
*/
function refact_starter_register_blocks() {
	// Definitions
	$theme_version = defined( 'THEME_VERSION' ) ? THEME_VERSION : '1.0.0';
	$transient_key = 'refact_block_folders';
	// Define DEVELOPMENT_MODE constant in wp-config.php to enable development mode
	$is_development = defined( 'DEVELOPMENT_MODE' ) && DEVELOPMENT_MODE;

	if ( $is_development ) {
		// Development mode: Always fetch block folders
		$block_folders = glob( get_template_directory() . '/build/blocks/*', GLOB_ONLYDIR | GLOB_NOSORT );
	} else {
		// Try to get the cached block folders from transients
		$transient_data = get_transient( $transient_key );

		// Check if cached data exists and matches the current theme version
		if ( false !== $transient_data && isset( $transient_data['theme_version'] ) && $transient_data['theme_version'] === $theme_version ) {
			$block_folders = isset( $transient_data['block_folders'] ) ? $transient_data['block_folders'] : array();
		} else {
			// If no cached data, retrieve block folders
			$block_folders = glob( get_template_directory() . '/build/blocks/*', GLOB_ONLYDIR | GLOB_NOSORT );

			// Update transient data
			$transient_data = array(
				'theme_version' => $theme_version,
				'block_folders' => $block_folders,
			);
			set_transient( $transient_key, $transient_data );
		}
	}

	// Register each block found in the block folders
	foreach ( $block_folders as $block_folder ) {
		register_block_type( $block_folder );
	}
}
add_action( 'init', 'refact_starter_register_blocks' );
