// constant values and functions used in multiple files
import moment from 'moment';

/*
 NOTES:
 The MTA labels the S shuttle as the 'GS' route, so the S shuttle icon has been named 'GS.png'
 The MTA labels some express 6 trains as having the route '6X' but does not distinguish any other local/express
 with separate routes. Thus, the app treats any query for the 6 train as both a query for the 6 and 6X trains.
*/

export const lines = ['1', '2', '3', '4', '5', '6', '7', 'A', 'C', 'E', 'B', 'D', 'F', 'M',
'G', 'J', 'Z', 'L', 'N', 'Q', 'R', 'W', 'GS'];

// helper functions used in multiple files

const formatTime = (timeStamp) => {
  return moment(timeStamp).format('MMM DD h:mm A');
};

export const formatTrips = (trips) => {
  return trips.map(trip => {
    return {
      ...trip,
      attributes: {
        ...trip.attributes,
        'origin-departure': formatTime(trip.attributes['origin-departure']),
        // convert any '6X' trains to '6'
        'route': trip.attributes.route === '6X' ? '6' : trip.attributes.route
      }
    };
  });
};

export const formatArrivals = (arrivals) => {
  return arrivals.map(arrival => {
    return {
      ...arrival,
      attributes: {
        ...arrival.attributes,
        'time': formatTime(arrival.attributes.time)
      }
    }
  });
};