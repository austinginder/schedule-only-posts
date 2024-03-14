<?php
/**
 * Plugin Name: Schedule Only Posts
 * Description: Disables the publish button, allowing only for posts to be scheduled.
 * Version: 1.0
 * Author: Austin Ginder
 * Author URI: https://github.com/austinginder/schedule-only-posts
 */

add_action('admin_enqueue_scripts', 'schedule_only_posts');
function schedule_only_posts() {
    wp_enqueue_script('disable-publish-button', plugins_url('/js/disable-publish.js', __FILE__), [], '1.0', true);
}
