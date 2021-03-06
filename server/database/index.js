const { Client } = require('pg');
const { createTimestamp, formatTrips} = require('../utils/utils.js');

const client = new Client({
  connectionString: process.env.DATABASE_URL || require('../config.js').databaseUrl,
  ssl: true,
});

client.connect();

const saveTrip = (trip) => {
  const queryStr = `
    insert into trips(trip_id, self_url, route_name, origin_departure, destination,
    route_image_url, arrivals_relationships_url, arrivals_url)
    select $1, $2, $3, $4, $5, $6, $7, $8
    where not exists (
      select trip_id from trips where trips.trip_id = ($1)
    )`;

  const values = [trip.id, trip.links.self, trip.attributes.route, createTimestamp(trip.attributes['origin-departure']),
    trip.attributes.destination, trip.attributes['route-image-url'], trip.relationships.arrivals.links.self,
    trip.relationships.arrivals.links.related];

  return client.query(queryStr, values);
};

exports.getFavoriteTrips = async (userId) => {
  const queryStr = `
    select t.trip_id, t.self_url, t.route_name, t.origin_departure, t.destination,
    t.route_image_url, t.arrivals_relationships_url, t.arrivals_url
    from favorite_trips
    join users on favorite_trips.user_id = users.user_id
    join trips t on favorite_trips.trip_id = t.trip_id
    where users.user_id = ($1)`;
  
  const favoriteTrips = await client.query(queryStr, [userId]);
  if (favoriteTrips.rows.length) return formatTrips(favoriteTrips.rows);
  else return []; 
};

exports.saveFavoriteTrip = async (userId, trip) => {
  const queryStr = `
    insert into favorite_trips(trip_id, user_id)
    select $1, $2
    where not exists (
      select * from favorite_trips f_t where f_t.trip_id = ($1)
      and f_t.user_id = ($2)
    )
  `;

  await saveTrip(trip);
  return client.query(queryStr, [trip.id, userId]);
};

exports.deleteFavoriteTrip = (userId, tripId) => {
  const queryStr = `delete from favorite_trips where user_id = ($1) and trip_id = ($2)`;
  return client.query(queryStr, [userId, tripId])
};

const getFavoriteLines = async (userId) => {
  const queryStr = `
    select l.line_name
    from favorite_lines
    join users on favorite_lines.user_id = users.user_id
    join lines l on favorite_lines.line_name = l.line_name
    where users.user_id = ($1)`;
  
  const favoriteLines = await client.query(queryStr, [userId]);
  return favoriteLines.rows;
};

const addFavoriteLine = (userId, line) => {
  const queryStr = `
    insert into favorite_lines(user_id, line_name)
    values ($1, $2)
  `;
  return client.query(queryStr, [userId, line])
};

const addFavoriteLines = (userId, lines) => {
  return lines.map(line => addFavoriteLine(userId, line));
};

const deleteFavoriteLine = (userId, line) => {
  const queryStr = `delete from favorite_lines where user_id = ($1) and line_name = ($2)`;
  return client.query(queryStr, [userId, line]);
};

const deleteFavoriteLines = (userId, lines) => {
  return lines.map(line => deleteFavoriteLine(userId, line));
};

exports.updateFavoriteLines = async (userId, newFavorites) => {
  const oldFavoritesRows = await getFavoriteLines(userId);
  const oldFavorites = oldFavoritesRows.map(lineRow => lineRow.line_name)
  const linesToDelete = oldFavorites.filter(oldFave => !newFavorites.includes(oldFave));
  const linesToAdd = newFavorites.filter(newFave => !oldFavorites.includes(newFave));

  return addFavoriteLines(userId, linesToAdd).concat(deleteFavoriteLines(userId, linesToDelete));
};

exports.getFavoriteLines = getFavoriteLines; // this one is reused by another function