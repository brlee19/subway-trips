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
  trip_id serial PRIMARY KEY,
  self_url VARCHAR,
  route_name VARCHAR,
  origin_departure VARCHAR,
  destination VARCHAR,
  route_image_url VARCHAR,
  arrivals_relationships_url VARCHAR,
  arrivals_url VARCHAR
);

CREATE TABLE lines(
  line_name varchar primary key
);

CREATE TABLE favorite_trips(
  -- users to trips (many to many)
  trip_id serial references trips(trip_id),
  user_id serial references users(user_id),
  unique (user_id, trip_id)
);

CREATE TABLE favorite_lines(
  -- users to lines (many to many)
  user_id serial references users(user_id),
  line_name varchar references lines(line_name),
  unique (user_id, line_name)
);
