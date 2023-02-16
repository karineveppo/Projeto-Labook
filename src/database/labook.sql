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
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

INSERT INTO users (id, name, email, password, role, created_at)
VALUES
    ("u001", "Marcos Benhur", "marcosbenhur@gmail.com", "mb0123", "admin", "13/02/2023"),
    ("u002", "Karine Veppo", "karineveppo@gmail.com", "mb1234", "admin", "13/02/2023"),
    ("u003", "Marcos Daniel", "marcosdaniel@gmail.com", "mb2345", "user", "13/02/2023"),
    ("u004", "Enzo Paschoal", "enzopaschoal@gmail.com", "mb3456", "user", "13/02/2023"),
    ("u005", "Flávia Manuela", "flaviamanuela@gmail.com", "mb4567", "user", "13/02/2023"),
    ("u006", "Rafaela Karine", "rafaelakarine@gmail.com", "mb5678", "user", "13/02/2023"),
    ("u007", "Vinicius Oyama", "vinuciusoyama@gmail.com", "mb6789", "user", "13/02/2023");

INSERT INTO posts (id, creator_id, content, likes, dislikes, created_at, updated_at)
VALUES
    ("p001", "u001", "Seus sonhos não precisam de platéia, eles só precisam de você!", "0", "0", "13/02/2023", "13/02/2023"),
    ("p002", "u002", "O que você viverá amanhã é frtuto do que você escolhe hoje!!!!", "0", "0", "13/02/2023", "13/02/2023"),
    ("p003", "u003", "Vai. E se der medo, vai com medo mesmo!", "0", "0", "13/02/2023", "13/02/2023"),
    ("p004", "u004", "Começando uma nova História! Turno da manhã... aí vou Eu!!", "1", "0", "13/02/2023", "13/02/2023"),
    ("p005", "u005", "Pronta para iniciar as aulas na Turma 34!!", "0", "0", "13/02/2023", "13/02/2023"),
    ("p006", "u006", "Esperando ansiosa por mais um ano letivo! Contando os dias para voltar para escola!", "0", "0", "13/02/2023", "13/02/2023"),
    ("p007", "u007", "Primeiro dia na escolhinha! Mamãe me levou bem cedinho! Vivaaa!!!", "1", "0", "13/02/2023", "13/02/2023");

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u001", "p004",1),
    ("u002", "p007",1),
    ("u001", "p007",1),
    ("u003", "p005",0),
    ("u004", "p007",1),
    ("u005", "p006",0),
    ("u006", "p005",0);


SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM likes_dislikes;

DROP TABLE users;

DROP TABLE posts;

DROP TABLE likes_dislikes;