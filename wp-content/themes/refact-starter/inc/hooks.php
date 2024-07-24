<?php
/**
 * Hooks
 *
 * @package Refact_Starter
 */
defined( 'ABSPATH' ) || exit;

/*
* Register the blocks
*
* @return void
*/
function refact_starter_register_blocks() {
	$blocks = array(
		'footer',
		'header',
	);
	$template_directory = get_template_directory();
	foreach ( $blocks as $block ) {
		register_block_type( $template_directory . "/build/blocks/$block" );
	}
}
add_action( 'init', 'refact_starter_register_blocks' );
