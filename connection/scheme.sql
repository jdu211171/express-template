CREATE TABLE IF NOT EXISTS User
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    CONSTRAINT username UNIQUE (username)
) COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Post
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    content    TEXT                    NOT NULL,
    user_id    INT                     NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP               NULL,
    constraint Post FOREIGN KEY (user_id) REFERENCES User (id)
) COLLATE = utf8mb4_unicode_ci;

CREATE INDEX user_id ON Post (user_id);

CREATE TABLE IF NOT EXISTS Comment
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    sentence   TEXT                    NOT NULL,
    post_id    INT                     NOT NULL,
    user_id    INT                     NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at DATETIME(3)             null,
    CONSTRAINT Comment FOREIGN KEY (post_id) REFERENCES Post (id) ON DELETE CASCADE,
    CONSTRAINT Comment FOREIGN KEY (user_id) REFERENCES User (id)
) COLLATE = utf8mb4_unicode_ci;

CREATE INDEX post_id ON Comment (post_id);

CREATE INDEX user_id ON Comment (user_id);

CREATE TABLE IF NOT EXISTS Reaction
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
    reaction_type TINYINT NOT NULL,
    post_id       INT     NOT NULL,
    user_id       INT     NOT NULL,
    CONSTRAINT Reaction FOREIGN KEY (post_id) REFERENCES Post (id) ON DELETE CASCADE,
    CONSTRAINT Reaction FOREIGN KEY (user_id) REFERENCES User (id)
) COLLATE = utf8mb4_unicode_ci;

CREATE INDEX post_id ON Reaction (post_id);

CREATE INDEX user_id ON Reaction (user_id);