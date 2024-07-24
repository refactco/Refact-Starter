<?php
/**
 * Title: Footer logo
 * Slug: refact-starter/footer-logo
 * Categories: text
 * Inserter: no
 *
 * @package Refact_Starter
 */

?>

<!-- wp:image {"width":168,"sizeSlug":"full","linkDestination":"custom"} -->
<figure class="wp-block-image size-full is-resized">
	<a href="<?php echo home_url(); ?>">
	<img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/logo.png' ) ); ?>" alt="<?php echo get_bloginfo( 'name' ); ?>" width="172">
	</a>
</figure>
<!-- /wp:image -->
