CREATE TABLE breweries (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255)
);

CREATE TABLE beers (
    number INT,
    abv DECIMAL(5, 2) NULL,
    ibu DECIMAL(5, 2) NULL,
    id INT PRIMARY KEY,
    name VARCHAR(255),
    style VARCHAR(255),
    brewery_id INT,
    ounces DECIMAL(5, 2),
    FOREIGN KEY (brewery_id) REFERENCES breweries(id)
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(255)
);

CREATE TYPE vote_type AS ENUM ('upvote', 'downvote', 'unreact');

CREATE TABLE votes (
    id INT PRIMARY KEY,
    user_id INT,
    beer_id INT,
    vote_type vote_type,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (beer_id) REFERENCES beers(id)
);

CREATE TABLE comments (
    id INT PRIMARY KEY,
    user_id INT,
    beer_id INT,
    comment_text TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (beer_id) REFERENCES beers(id)
);