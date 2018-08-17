import axios from 'axios';

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

export const fetchTrips = () => {
  return axios.get('https://nooklyn-interview.herokuapp.com/trips');
};

export const fetchArrivals = (tripId) => {
  return axios.get(`https://nooklyn-interview.herokuapp.com/trips/${tripId}/arrivals`);
}
// API call for arrivals given a specific trip