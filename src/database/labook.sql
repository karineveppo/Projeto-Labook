-- Active: 1676548484980@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Marcos Benhur", "marcosbenhur@gmail.com", "mb0123", "ADMIN"),
    ("u002", "Karine Veppo", "karineveppo@gmail.com", "kv1234", "ADMIN"),
    ("u003", "Marcos Daniel", "marcosdaniel@gmail.com", "md2345", "USER"),
    ("u004", "Enzo Paschoal", "enzopaschoal@gmail.com", "ep3456", "USER"),
    ("u005", "Flávia Manuela", "flaviamanuela@gmail.com", "fm4567", "USER"),
    ("u006", "Rafaela Karine", "rafaelakarine@gmail.com", "rk5678", "USER"),
    ("u007", "Vinicius Oyama", "vinuciusoyama@gmail.com", "vo6789", "USER");

INSERT INTO posts (id, creator_id, content)
VALUES
    ("p001", "u001", "Seus sonhos não precisam de platéia, eles só precisam de você!"),
    ("p002", "u002", "O que você viverá amanhã é frtuto do que você escolhe hoje!!!!"),
    ("p003", "u003", "Vai. E se der medo, vai com medo mesmo!"),
    ("p004", "u004", "Começando uma nova História! Turno da manhã... aí vou Eu!!"),
    ("p005", "u005", "Pronta para iniciar as aulas na Turma 34!!"),
    ("p006", "u006", "Esperando ansiosa por mais um ano letivo! Contando os dias para voltar para escola!"),
    ("p007", "u007", "Primeiro dia na escolhinha! Mamãe me levou bem cedinho! Vivaaa!!!");

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u002", "p001",1),
    ("u001", "p002",1),
    ("u003", "p002",1),
    ("u001", "p003",1),
    ("u002", "p003",1),
    ("u005", "p004",1),
    ("u006", "p004",0),
    ("u006", "p005",1),
    ("u005", "p005",1),
    ("u001", "p006",1),
    ("u002", "p006",1),
    ("u001", "p007",1),
    ("u001", "p007",1),
    ("u004", "p007",1);

SELECT * FROM users;

SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name As cretor_name
FROM posts
JOIN users
ON posts.creator_id = users.id;

SELECT * FROM posts;
