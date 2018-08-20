const { Client } = require('pg');
const moment = require('moment');

const client = new Client({
  connectionString: process.env.DATABASE_URL || require('../config.js').databaseUrl,
  ssl: true,
});

client.connect();

const createTimestamp = (formattedTime) => {
  return moment(formattedTime, 'MMM DD h:mm A').toISOString();
};

exports.getFavoriteTrips = async (userId) => {
  const queryStr = `
    select t.trip_id, t.self_url, t.route_name, t.origin_departure, t.destination,
    t.route_image_url, t.arrivals_relationships_url, t.arrivals_url
    from favorite_trips
    join users on favorite_trips.user_id = users.user_id
    join trips t on favorite_trips.trip_id = t.trip_id
    where users.user_id = ${userId}`;
  
  const favoriteTrips = await client.query(queryStr);
  if (favoriteTrips.rows.length) return formatTrips(favoriteTrips.rows);
  else return []; 
};

const formatTrips = (tripQueryResults) => {
  return tripQueryResults.map(trip => (
    {
      id: String(trip.trip_id),
      type: 'trips',
      links: {
        self: trip.self_url
      },
      attributes: {
        route: String(trip.route_name),
        ['origin-departure']: trip.origin_departure,
        destination: trip.destination,
        ['route-image-url']: trip.route_image_url,
      },
      relationships: {
        arrivals: {
          links: {
            self: trip.arrivals_relationships_url,
            related: trip.arrivals_url
          }
        }
      }
    }
  ));
};

const saveTrip = async (trip) => {
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

  return await client.query(queryStr, values);
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
  return await client.query(queryStr, [trip.id, userId]);
};

exports.deleteFavoriteTrip = async (userId, tripId) => {
  const queryStr = `delete from favorite_trips where user_id = ($1) and trip_id = ($2)`;
  return await client.query(queryStr, [userId, tripId])
};

exports.getFavoriteLines = async (userId) => {
  const queryStr = `
    select l.line_name
    from favorite_lines
    join users on favorite_lines.user_id = users.user_id
    join lines l on favorite_lines.line_name = l.line_name
    where users.user_id = ($1)`;
  
  const favoriteLines = await client.query(queryStr, [userId]);
  return favoriteLines.rows;
};

exports.updateFavoriteLines = async (userId) => {
  // ideally get an array of lines to add and another one for lines to delete
};