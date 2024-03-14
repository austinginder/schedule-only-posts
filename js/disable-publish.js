const { subscribe } = wp.data;
const initialPostStatus = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'status' );

// Only allow publishing posts that are set to a future date.
if ( 'publish' !== initialPostStatus ) {

    // Track locking.
    let locked = false;

    // Watch for the publish event.
    let unssubscribe = subscribe( () => {
        const currentPostStatus = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'status' );
        const currentPostType = wp.data.select( 'core/editor' ).getCurrentPostType();
        if ( 'publish' !== currentPostStatus && 'post' == currentPostType ) {

            // Compare the post date to the current date, lock the post if the date isn't in the future.
            const postDate = new Date( wp.data.select( 'core/editor' ).getEditedPostAttribute( 'date' ) );
            const currentDate = new Date();
            if ( postDate.getTime() <= currentDate.getTime() ) {
                if ( ! locked ) {
                    locked = true;
                    wp.data.dispatch( 'core/editor' ).lockPostSaving( 'futurelock' );
                }
            } else {
                if ( locked ) {
                    locked = false;
                    wp.data.dispatch( 'core/editor' ).unlockPostSaving( 'futurelock' );
                }
            }
        }
    } );
}