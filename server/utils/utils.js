const moment = require('moment');

exports.createTimestamp = (formattedTime) => {
  return moment(formattedTime, 'MMM DD h:mm A').toISOString();
};

exports.formatTrips = (tripQueryResults) => {
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