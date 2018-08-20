const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || require('../config.js').databaseUrl,
  ssl: true,
});

client.connect();

exports.getFavoriteTrips = async (userId) => {
  const queryStr = `
    select t.trip_id, t.self_url, t.route_name, t.origin_departure, t.destination,
    t.route_image_url, t.arrivals_relationships_url, t.arrivals_urls
    from favorite_trips
    join users on favorite_trips.user_id = users.user_id
    join trips t on favorite_trips.trip_id = t.trip_id
    where users.user_id = ${userId}`;
  
  try {
    const favoriteTrips = await client.query(queryStr);
    if (favoriteTrips.rows.length) return favoriteTrips.rows;
    else return []; 
  } catch(e) {
    console.log('error getting favorite trips', e);
    return null;
  };
};

// const tripLookup = async (tripId) => {
//   try {
//     const queryResult = await client.query(`select * from trips where trips.trip_id = ${tripId}`);
//     return !!queryResult.rows.length;
//   } catch(e) {
//     console.log('error getting favorite trips', e);
//     return null;
//   };
// };

const saveTrip = async (trip) => {
  const queryStr = `
    insert into trips(trip_id, self_url, route_name, origin_departure, destination,
    route_image_url, arrivals_relationships_url, arrivals_url)
    select $1, $2, $3, $4, $5, $6, $7, $8
    where not exists (
      select trip_id from trips where trips.trip_id = ($9)
    )`;

  const values = [trip.id, trip.links.self, trip.attributes.route, trip.attributes['origin-departure'],
    trip.attributes.destination, trip.attributes['route-image-url'], trip.relationships.arrivals.links.self,
    trip.relationships.arrivals.links.related, trip.id];
  
  console.log('origin departure is', trip.attributes['origin-departure'])
  console.log('route image url is', trip.attributes['route-image-url'])

  try {
    const insertResult = await client.query(queryStr, values);
    console.log('trip insertResult is', insertResult);
    return insertResult;
  } catch(e) {
    console.log('error getting favorite trips', e);
    return null;
  };
};

exports.saveFavoriteTrip = async (userId, trip) => {
  const queryStr = `insert into favorite_trips(trip_id, user_id) values ($1, $2)`;
  try {
    await saveTrip(trip);
    const insertResult = await client.query(queryStr, [trip.id, userId]);
    console.log('trip favorite insert result is', insertResult);
    return insertResult;
  } catch(e) {
    console.log('error saving favorite trips', e);
    return null;
  };
};