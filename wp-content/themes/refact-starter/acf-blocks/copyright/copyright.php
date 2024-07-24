<?php

// Create class attribute allowing for custom "className" and "align" values.
$class_name = 'c-copyright-block';
if ( ! empty( $block['className'] ) ) {
	$class_name .= ' ' . $block['className'];
}
if ( ! empty( $block['textColor'] ) ) {
	$class_name .= ' has-' . $block['textColor'] . '-color';
}

// Load values and assign defaults.
$currentYear = date( 'Y' );
$copyright   = get_field( 'copyright_text' ) ? get_field( 'copyright_text' ) : '© Copyright $year, All Rights Reserved';

// Replace $year with the current year
$copyrightText = str_replace( '$year', $currentYear, $copyright );

?>

<div class="<?php echo esc_attr( $class_name ); ?>">
	<p class="c-copyright-block__text"><?php echo esc_attr( $copyrightText ); ?></p>
</div>