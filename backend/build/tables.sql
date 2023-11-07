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
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255)
);

CREATE TYPE vote_type AS ENUM ('upvote', 'downvote', 'unreact');

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    beer_id INT,
    vote_type vote_type,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (beer_id) REFERENCES beers(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    beer_id INT,
    comment_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (beer_id) REFERENCES beers(id)
);