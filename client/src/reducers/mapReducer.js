import { formatArrivals } from '../constants.js';

const initialState = {
  center: { // remove if unable to make map center dynamic
    lat: 40.7128,
    lng: -74.0060
  },
  zoom: 11, // make dynamic if possible
  arrivals: {
    selectedTrip: null,
    selectedArrival: null,
    all: []
  }
};

const googleMap = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_ARRIVALS': {
      const arrivals = formatArrivals(action.payload.response.data.data);
      const newCenter = calculateCentralCoordinates(arrivals);
      return {
        ...state,
        center: newCenter,
      };
    }
    
    case 'SELECT_ARRIVAL': {
      const { arrival } = action.payload;
      return {
        ...state,
        arrivals: {
          ...state.arrivals,
          selectedArrival: arrival
        }
      };
    }

    case 'RECENTER_MAP': {
      const { center, zoom } = action.payload;
      return {
        ...state,
        center,
        zoom
      };
    }

    default:
      return state;
  }
};

export default googleMap;

// move to a constants file b/c used by multiple reducers!

const calculateCentralCoordinates = (arrivals) => {
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
    lng: sumCoords[1] / arrivalsWithCoordinates.length
  };
};