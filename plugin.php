<?php
    /**
     * 
     * Plugin Name: DH Blocks
     * Plugin URI: https://dhgutenberg.com/first-guten-block
     * Description: This is our first gutenberg blocks plugin for learning basis
     * Author: DHGutenberg
     * Author URI: https://dhgutenberg.com
     * 
     */

    if( ! defined( 'ABSPATH')) {
        exit;
    }


    function classes($arr = array(), $permanent_classes = '') {
        if(!is_array($arr)) return '';
		$classes = ' ' . $permanent_classes;
		foreach ($arr as $key => $value) {
			if((isset($value) && !empty($value)) || $value == true)
				$classes .= ' ' . $key;
		}
		return trim($classes);
	}

    function inline_styles($arr = array()) {
		if(!is_array($arr)) return;
		$styles = '';
		foreach ($arr as $key => $value) {
			// code...
			if(isset($value) && !empty($value)){
				$styles .= $key.':'.$value.';';
			}
		}

		return $styles;
	}

    function dh_gutenberg_blocks_categories( $categories, $post) {
        return array_merge(
            $categories, 
            array(
                array(
                    'slug' => 'dh-guten-text-category',
                    'title' => __('Text Blocks', 'dh-gutenberg'),
                    'icon' => 'editor-paste-text'
                )
            )
        );
    }

    add_filter('block_categories_all', 'dh_gutenberg_blocks_categories', 10, 2);




    function dhguten_blocks_register_block_type($block, $options=array()) {
        $function_name = str_replace("-","_", $block) . '_func';
        register_block_type('dh-gutenberg/' . $block,
            array_merge(array(
                'editor_script' => 'dh-gutenberg-editor-script',
                'editor_style' => 'dh-gutenberg-editor-style',
                'script' => 'dh-gutenberg-script',
                'style' => 'dh-gutenberg-style',
                'render_callback' => $function_name
            ), $options));
    }

    function firstblock_func($attr, $content, $block) {
        $block_name = isset($block->name) ? explode('/', $block->name)[1] : '';
        $title = isset($attr['title']) ? $attr['title'] : '';
    }

    function secondblock_func($attr, $content, $block) {
        $block_name = isset($block->name) ? explode('/', $block->name)[1] : '';
        $content = isset($attr['content']) ? $attr['content'] : '';
        $className = isset($attr['className']) ? $attr['className'] : '';
        $shadow = isset($attr['shadow']) ? $attr['shadow'] : false;
        $shadowOpacity = isset($attr['shadowOpacity']) ? $attr['shadowOpacity'] * 100 : '';
        $textColor = isset($attr['textColor']) ? $attr['textColor']: '';
        $customTextColor = isset($attr['customTextColor']) ? $attr['customTextColor']: '';
        $backgroundColor = isset($attr['backgroundColor']) ? $attr['backgroundColor']: '';
        $customBackgroundColor = isset($attr['customBackgroundColor']) ? $attr['customBackgroundColor']: '';
        $textAlignment = isset($attr['textAlignment']) ? $attr['textAlignment']: 'left';
        
        $class_names = classes(array(
            'wp-block-dh-gutenberg-secondblock' => $block_name,
            'has-shadow'    => $shadow,
            'shadow-opacity-'.$shadowOpacity   => $shadowOpacity,
            'has-'.$textColor.'-color'  => $textColor,
            'has-'.$backgroundColor.'-background-color' => $backgroundColor,
            'text-'. $textAlignment => $textAlignment
        ), $className);

        $inline_css = inline_styles(array(
            'color'    => $customTextColor . ' !important',
            'background-color'    => $customBackgroundColor,
        ));

        return sprintf('<h4 class="%2$s" style="%3$s">%1$s</h4>', 
            $content,
            $class_names,
            $inline_css
        );
    }


    function team_member_func($attr, $content, $block) {
        $block_name = isset($block->name) ? explode('/', $block->name)[1] : '';


        // Content Section
        $title = (isset($attr['title']) && !empty($attr['title'])) ? sprintf(
            '<h4 class="wp-block-dh-gutenberg-team-member__title">%1$s</h4>',
             esc_html($attr['title'])) : '';
        $info = (isset($attr['info']) && !empty($attr['info'])) ? sprintf(
            '<p class="wp-block-dh-gutenberg-team-member__info">%1$s</p>',
             esc_html($attr['info'])) : '';
        $social_icons = isset($attr['socials']) ? $attr['socials'] : array(
            array(
                'link'  => 'https://facebook.com/hrrarya',
                'icon'  => 'facebook'
            ),
            array(
                'link'  => 'https://twitter.com/hrrarya',
                'icon'  => 'twitter'
            ),
        );

        $social_icon_html = '<ul class="wp-block-dh-gutenberg-team-member__socialIcons">';

        foreach ($social_icons as $value) {
            # code...
            $social_icon_html .= sprintf(
                '<li class="wp-block-dh-gutenberg-team-member__socialIconsLi">
                    <a class="wp-block-dh-gutenberg-team-member__socialIconLink" href="%1$s" target="_blank" rel="noopener noreferrer">
                        <span class="dashicon dashicons dashicons-%2$s" size="16"></span>
                    </a>
                </li>',
                $value['link'],
                $value['icon']
            );
        }

        $social_icon_html .= '</ul>';

        
        
        $url = (isset($attr['imageUrl']) && !empty($attr['imageUrl'])) ? $attr['imageUrl'] : '';
        $alt = (isset($attr['imageAlt']) && !empty($attr['imageAlt'])) ? $attr['imageAlt'] : '';
        $id = isset($attr['imageId']) ? $attr['imageId'] : '';

        
        $image_class = classes(array(
            'wp-image-'.$id => $id
        ), "wp-block-dh-gutenberg-team-member__image");

        $image = !empty($url) ? sprintf(
                '<img class="%3$s" src="%1$s" alt="%2$s"/>', 
                $url, 
                $alt,
                $image_class
            ) : '';
        
        $className = isset($attr['className']) ? $attr['className'] : '';

        $class_names = classes(array(
            'wp-block-dh-gutenberg-team-member' => $block_name
        ), $className);

        return sprintf(
            '<div class="%1$s">
                %4$s
                %2$s
                %3$s
                %5$s
            </div>', 
            $class_names,
            $title,
            $info,
            $image,
            $social_icon_html
        );
    }

    function latest_post_func($attr, $content, $block) {
        $number_of_posts = isset($attr['numberOfPosts']) ? $attr['numberOfPosts'] : 5;
    
        $args = array(
            'posts_per_page'    => $number_of_posts
        );

        $query = new WP_Query($args);

        $latest_post_html = '<ul class="wp-block-dh-gutenberg-latest-post_list">';

        if($query->have_posts()){
            while($query->have_posts()){
                $query->the_post();
                $post_id = get_the_ID();
                $latest_post_html .= sprintf(
                    '<li class="wp-block-dh-gutenberg-latest-post_list_item">
                        <a href="%2$s">
                            %1$s
                        </a>
                    </li>',
                    get_the_title(),
                    esc_attr(get_permalink($post_id))
                );
            }
        }else{
            $latest_post_html .= '<li class="wp-block-dh-gutenberg-latest-post_list_item">No Post Found</li>';
        }

        $latest_post_html .="</ul>";

        

        return sprintf(
            '<div class="wp-block-dh-gutenberg-latest-post">
                <h3>Latest Post</h3>
                %1$s
            </div>',
            $latest_post_html
        );
    }

    function dhguten_blocks_register() {

        wp_register_script('dh-gutenberg-editor-script',plugins_url('dist/editor.js', __FILE__), array(
            'wp-blocks',
            'wp-i18n',
            'wp-element',
            'wp-editor',
            'wp-components',
            'lodash',
            'wp-blob',
            'wp-data',
            'wp-html-entities',
            'wp-edit-post',
        ));

        wp_register_script('dh-gutenberg-script',plugins_url('dist/script.js', __FILE__), array('jquery'));

        wp_register_style('dh-gutenberg-editor-style',plugins_url('dist/editor.css', __FILE__), array('wp-edit-blocks'));

        wp_register_style('dh-gutenberg-style',plugins_url('dist/style.css', __FILE__), array());
        wp_enqueue_style('dh-bootstrap-style',plugins_url('src/base/bootstrap.min.css', __FILE__), array());


        $block_list = array(
            'firstblock',
            'secondblock',
            'team-member',
            'latest-post'
        );

        foreach ($block_list as $value) {
            dhguten_blocks_register_block_type($value);
        }

    }

    add_action('init', 'dhguten_blocks_register');