DROP TABLE users;
DROP TABLE trips;
DROP TABLE lines;
DROP TABLE favorite_trips;
DROP TABLE favorite_lines
-- drop all tables

CREATE TABLE users(
  user_id serial PRIMARY KEY,
);

CREATE TABLE trips(
  -- various fields necessary to create the trip object 
  trip_id INT NOT NULL PRIMARY KEY,
  link_self VARCHAR(100),
  route_id VARCHAR(5),
  origin_departure VARCHAR(100),
  route_image_url VARCHAR(100),
  arrivals_relationships_url VARCHAR(100),
  arrivals_urls VARCHAR(100)
);

CREATE TABLE lines(
  line_name varchar primary key
);

CREATE TABLE favorite_trips(
  -- users to trips (many to many)
  trip_id serial NOT NULL PRIMARY KEY,
  user_id INT
);

CREATE TABLE favorite_lines(
  -- users to lines (many to many)
  user_id serial references users(user_id),
  line_name varchar references lines(line_name),
  unique (user_id, line_name)
);
