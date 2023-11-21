CREATE TABLE breweries (
    id INTEGER PRIMARY KEY,
    name TEXT,
    city TEXT,
    state TEXT
);

CREATE TABLE beers (
    number INTEGER,
    abv REAL,
    ibu REAL,
    id INTEGER PRIMARY KEY,
    name TEXT,
    style TEXT,
    brewery_id INTEGER,
    ounces REAL,
    FOREIGN KEY (brewery_id) REFERENCES breweries(id)
);

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT
);

CREATE TABLE votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    beer_id INTEGER,
    vote_type TEXT CHECK( vote_type IN ('upvote','downvote','unreact') ),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (beer_id) REFERENCES beers(id)
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    beer_id INTEGER,
    comment_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (beer_id) REFERENCES beers(id)
);