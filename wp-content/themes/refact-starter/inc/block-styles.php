<?php
/**
 * Block styles.
 *
 * @package Refact_Starter
 */
defined( 'ABSPATH' ) || exit;

/**
 * Register new block styles
 */
function refact_starter_register_block_styles() {
	register_block_style( // phpcs:ignore WPThemeReview.PluginTerritory.ForbiddenFunctions.editor_blocks_register_block_style
		'core/button',
		array(
			'name'  => 'refact-starter-flat-button',
			'label' => __( 'Flat button', 'refact-starter' ),
		)
	);

	register_block_style( // phpcs:ignore WPThemeReview.PluginTerritory.ForbiddenFunctions.editor_blocks_register_block_style
		'core/button',
		array(
			'name'  => 'refact-starter-shadow-button',
			'label' => __( 'Button with shadow', 'refact-starter' ),
		)
	);
}
add_action( 'init', 'refact_starter_register_block_styles' );
