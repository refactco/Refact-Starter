<?php
/**
 * Advanced Custom Fields Functions & Definitions
 *
 * @package Refact_Starter
 */
defined( 'ABSPATH' ) || exit;

/**
 * Add ACF option pages.
 */
if ( function_exists( 'acf_add_options_page' ) ) {
	acf_add_options_page(
		array(
			'page_title' => 'Site Options',
			'menu_title' => 'Site Options',
			'menu_slug'  => 'theme-options',
			'capability' => 'edit_posts',
			'redirect'   => false,
			'position'   => 80,
		)
	);
}

/**
 * Add Custom Block Category
 */
function refact_starter_block_categories( $block_categories, $editor_context ) {
	array_push(
		$block_categories,
		array(
			'slug'  => 'refact-starter',
			'title' => 'Refact Starter',
			'icon'  => null,
		)
	);
	return $block_categories;
}
add_filter( 'block_categories_all', 'refact_starter_block_categories', 10, 2 );

/**
 * Register ACF Blocks
 */
function refact_starter_register_acf_blocks() {
	// Definitions
	$theme_version = defined( 'THEME_VERSION' ) ? THEME_VERSION : '1.0.0';
	$transient_key = 'refact_acf_block_folders';
	// Define DEVELOPMENT_MODE constant in wp-config.php to enable development mode
	$is_development = defined( 'DEVELOPMENT_MODE' ) && DEVELOPMENT_MODE;

	if ( $is_development ) {
		// Development mode: Always fetch block folders
		$block_folders = glob( get_template_directory() . '/acf-blocks/*', GLOB_ONLYDIR | GLOB_NOSORT );
	} else {
		// Try to get the cached block folders from transients
		$transient_data = get_transient( $transient_key );

		// Check if cached data exists and matches the current theme version
		if ( false !== $transient_data && isset( $transient_data['theme_version'] ) && $transient_data['theme_version'] === $theme_version ) {
			$block_folders = isset( $transient_data['block_folders'] ) ? $transient_data['block_folders'] : array();
		} else {
			// If no cached data, retrieve block folders
			$block_folders = glob( get_template_directory() . '/acf-blocks/*', GLOB_ONLYDIR | GLOB_NOSORT );

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
add_action( 'init', 'refact_starter_register_acf_blocks' );

/**
 * Remove ACF Block Wrapper
 */
add_filter( 'acf/blocks/wrap_frontend_innerblocks', '__return_false' );
