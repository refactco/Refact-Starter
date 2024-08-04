<?php
/**
 * Hooks
 *
 * @package Refact_Starter
 */
defined( 'ABSPATH' ) || exit;

/*
* Register the Blocks
*/
function refact_starter_register_blocks() {
	// Attempt to retrieve block folders from the cache
	$block_folders = wp_cache_get( 'block_folders', 'refact_starter' );

	// If block folders are not cached, retrieve them from the file system and cache the result
	if ( false === $block_folders ) {
		$block_folders = glob( get_template_directory() . '/build/blocks/*', GLOB_ONLYDIR );
		wp_cache_set( 'block_folders', $block_folders, 'refact_starter', WEEK_IN_SECONDS );
	}

	// Register each block found in the block folders
	foreach ( $block_folders as $block_folder ) {
		register_block_type( $block_folder );
	}
}
add_action( 'init', 'refact_starter_register_blocks' );
