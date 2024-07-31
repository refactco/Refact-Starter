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
	$blocks = glob( get_template_directory() . '/build/blocks/*', GLOB_ONLYDIR );
	foreach ( $blocks as $block ) {
		register_block_type( $block );
	}
}
add_action( 'init', 'refact_starter_register_blocks' );
