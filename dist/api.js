"use strict";
/*
* <-- User -->

* /login                Creates a unique username and token for a new user.

* /login/{username}     Change old username to given username.

* /posts                Gets a list of posts created by a specific user.

* <-- Post -->

* /all                  Lists all posts.

* /find/{id}            Fetches a specific post with its comments and reactions.

* /create               Creates a new post.

* /update/{id}          Edits an existing post.

* /delete/{id}          Deletes a post.

* /{id}/reaction        Like or dislike a post.

* /{id}/reaction/all    Get all reactions for a post.

* <-- Comment -->

* /post/{id}/all        Lists all comments for a specific post.

* /post/{id}/comment    Creates a new comment on a post.

* /update/{id}          Edits an existing comment.

* /delete/{id}          Deletes a comment.

* <-- Search -->

/search: Search for posts based on keywords in content.

* */
