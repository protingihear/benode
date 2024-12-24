
cretate table dulu 

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategorikategori JSON NOT NULL,
    kata TEXT NOT NULL,
    deskpris TEXT NOT NULL,
    link_yt TEXT NOT NULL
);

di run di db nya

terus npm i aja

terus start nya npm star
