CREATE TABLE IF NOT EXISTS User
(
<<<<<<< HEAD
    id            INT AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(255) NOT NULL,
    devise_token  VARCHAR(255) NOT NULL,
=======
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    device_token VARCHAR(255) NOT NULL;
>>>>>>> c916f94fdf3aa670f29d3ca0e2208ace84db1a83
    CONSTRAINT unique_username UNIQUE (username)
) COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Post
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    content    TEXT                    NOT NULL,
    user_id    INT                     NOT NULL,
    created_at DATETIME DEFAULT NOW() NOT NULL,
    updated_at DATETIME               NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES User (id)
) COLLATE = utf8mb4_unicode_ci;

CREATE INDEX user_id ON Post (user_id);

CREATE TABLE IF NOT EXISTS Comment
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    sentence   TEXT                    NOT NULL,
    post_id    INT                     NOT NULL,
    user_id    INT                     NOT NULL,
    created_at DATETIME DEFAULT NOW() NOT NULL,
    updated_at DATETIME               NULL,
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES Post (id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_user_id FOREIGN KEY (user_id) REFERENCES User (id)
) COLLATE = utf8mb4_unicode_ci;

CREATE INDEX post_id ON Comment (post_id);
CREATE INDEX user_id_comment ON Comment (user_id);

CREATE TABLE IF NOT EXISTS Reaction
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
    reaction_type TINYINT NOT NULL,
    post_id       INT     NOT NULL,
    user_id       INT     NOT NULL,
    CONSTRAINT fk_reaction_post_id FOREIGN KEY (post_id) REFERENCES Post (id) ON DELETE CASCADE,
    CONSTRAINT fk_reaction_user_id FOREIGN KEY (user_id) REFERENCES User (id)
) COLLATE = utf8mb4_unicode_ci;

CREATE INDEX post_id ON Reaction (post_id);
CREATE INDEX user_id_reaction ON Reaction (user_id);

CREATE TABLE IF NOT EXISTS Notification
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT                     NOT NULL,
    post_id    INT                     NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    is_read    BOOLEAN DEFAULT FALSE   NOT NULL,
    CONSTRAINT fk_notification_user_id FOREIGN KEY (user_id) REFERENCES User (id),
    CONSTRAINT fk_notification_post_id FOREIGN KEY (post_id) REFERENCES Post (id)
) COLLATE = utf8mb4_unicode_ci;
