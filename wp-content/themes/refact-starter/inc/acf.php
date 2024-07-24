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
	$acf_blocks = array(
		'copyright',
	);
	$template_directory = get_template_directory();
	foreach ( $acf_blocks as $block ) {
		register_block_type( $template_directory . "/acf-blocks/$block" );
	}
}
add_action( 'init', 'refact_starter_register_acf_blocks' );

/**
 * Remove ACF Block Wrapper
 */
add_filter( 'acf/blocks/wrap_frontend_innerblocks', '__return_false' );
