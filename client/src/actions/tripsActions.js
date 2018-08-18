import axios from 'axios';
  
export const selectTrip = (trip) => {
  return async (dispatch) => {
    try {
      // could just use the link in the trip obj
      const response = await axios.get(`https://nooklyn-interview.herokuapp.com/trips/${trip.id}/arrivals`);
      dispatch(receiveArrivals(trip.id, response));
    } catch(e) {
      console.log('error selecting trip or getting its arrivals', e);
      //dispatch error state if using spinner, etc
    }
  }
};

export const receiveArrivals = (tripId, response) => {
  // set tripId in trips state, set arrivals in map state
  return {
    type: 'RECEIVE_ARRIVALS',
    payload: {
      tripId, // to update api state
      response // to update trips
    }
  };
};

export const addTripToFavorites = (trip) => {
  return {
    type: 'ADD_FAVORITE_TRIP',
    payload: {
      trip
    }
  };
};

export const removeTripFromFavorites = (trip) => {
  return {
    type: 'REMOVE_FAVORITE_TRIP',
    payload: {
      trip
    }
  };
};

export const displayFavoriteTrips = () => {
  return {
    type: 'DISPLAY_FAVORITE_TRIPS'
  };
};

export const displayCurrentPageTrips = () => {
  return {
    type: 'DISPLAY_CURRENT_PAGE_TRIPS'
  };
};