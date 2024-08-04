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
	// Attempt to retrieve ACF block folders from the cache
	$acf_block_folders = wp_cache_get( 'acf_block_folders', 'refact_starter' );

	// If ACF block folders are not cached, retrieve them from the file system and cache the result
	if ( false === $acf_block_folders ) {
		$acf_block_folders = glob( get_template_directory() . '/acf-blocks/*', GLOB_ONLYDIR );
		wp_cache_set( 'acf_block_folders', $acf_block_folders, 'refact_starter', WEEK_IN_SECONDS );
	}

	// Register each ACF block found in the ACF block folders
	foreach ( $acf_block_folders as $acf_block_folder ) {
		register_block_type( $acf_block_folder );
	}
}
add_action( 'init', 'refact_starter_register_acf_blocks' );

/**
 * Remove ACF Block Wrapper
 */
add_filter( 'acf/blocks/wrap_frontend_innerblocks', '__return_false' );
