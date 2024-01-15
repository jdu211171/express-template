CREATE TABLE IF NOT EXISTS User
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15) UNIQUE
);

CREATE TABLE IF NOT EXISTS Post
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    content    TEXT,
    user_id    INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS Comment
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    sentence   TEXT,
    post_id    INT,
    user_id    INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Post (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User (id)
);

CREATE TABLE IF NOT EXISTS Reaction
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
    reaction_type TINYINT,
    post_id       INT,
    user_id       INT,
    FOREIGN KEY (post_id) REFERENCES Post (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES User (id)
);
