<?php

if (!is_user_logged_in()) {
    wp_redirect( esc_url(site_url('/')));
} else {
        pageBannersection();
?>

<div class="container container--narrow page-section">

    <div class="create-note">
        <h2 class="headline headline--medium">Create New Note</h2>
        <input placeholder="Note Title" class="new-note-title" type="text">
        <textarea class="new-note-body" placeholder="Your note here..."></textarea>
        <span class="submit-note btn btn--blue">Create Note</span> <span class="note-limit-message"> Note limit reached:
            delete an existing note to make room for new one.</span>

    </div>

    <ul class='min-list link-list' id="my-notes">
        <?php
            $userNotes = new WP_Query(array(
                'post_type' => 'note',
                'posts_per_page' => -1,
                'author' => get_current_user_id() 
            ));

            while($userNotes -> have_posts()){
                $userNotes -> the_post();
                ?>
        <li data-id="<?php the_ID(); ?>">
            <input readonly class="note-title-field" value="<?php echo esc_attr($userNotes->post->post_title);  ?>">
            <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</span>
            <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</span>
            <textarea readonly class="note-body-field"><?php echo esc_textarea( wp_strip_all_tags(get_the_content()) ); ?>
            </textarea>
            <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right" aria-hidden="true"></i>
                Save</span>
        </li>
        <?php
            }
        ?>
    </ul>
</div>

<?php
}
    