import axios from 'axios';
import moment from 'moment';

export const calculateCentralCoordinates = (arrivals) => {
  // test case: works even when some coordinates are null
  const arrivalsWithCoordinates = arrivals.filter((arrival) => {
    return arrival.attributes.latitude && arrival.attributes.longitude;
  })  

  const sumCoords = arrivalsWithCoordinates.reduce((coords, arrival) => {
    const { latitude, longitude } = arrival.attributes;
    return [
      coords[0] + parseFloat(latitude), 
      coords[1] + parseFloat(longitude)
    ]
  }, [0, 0]);

  return {
    lat: sumCoords[0] / arrivalsWithCoordinates.length,
    long: sumCoords[1] / arrivalsWithCoordinates.length
  };
};

// assemble query
// make API call with the given query and return the trips to state

export const fetchTrips = async (apiState) => {
  const { page, sort, route } = apiState;
  // add more query assembly logic
  const response = await axios.get('https://nooklyn-interview.herokuapp.com/trips', {params: {
    'page[number]': page,
    'filter[route]': route,
    sort
    // 'filter[route]': 'F',
  }});
  return formatTrips(response.data.data);
};

export const fetchArrivals = (tripId) => {
  return axios.get(`https://nooklyn-interview.herokuapp.com/trips/${tripId}/arrivals`);
};

const formatTime = (timeStamp) => {
  return moment(timeStamp).format('MMM DD h:mm A');
};

const formatTrips = (trips) => {
  return trips.map(trip => {
    return {
      ...trip,
      attributes: {
        ...trip.attributes,
        'origin-departure': formatTime(trip.attributes['origin-departure'])
      }
    }
  });
}


// API call for arrivals given a specific trip