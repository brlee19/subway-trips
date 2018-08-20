import axios from 'axios';
  
export const fetchTrips = (params) => {
  const { page, sort, routes } = params;
  return async (dispatch) => {
    dispatch(requestTrips()); // not necessary no spinner needed?
    try {
      const response = await axios.get('https://nooklyn-interview.herokuapp.com/trips', {params: {
        'page[number]': page,
        // add 6X to route params if searching 6 train
        'filter[route]': routes.includes('6') ? [...routes, '6X'] : routes,
        sort
      }});
      dispatch(receiveTrips(params, response));
    } catch(e) {
      console.log('error fetching trips', e);
      dispatch(tripError());
    }
  }
};

export const requestTrips = () => {
  return { type: 'REQUEST_TRIPS'};
};

export const tripError = () => {
  return { type: 'TRIP_ERROR' };
};

export const receiveTrips = (params, response) => {
  return {
    type: 'RECEIVE_TRIPS',
    payload: {
      params, // to update api state
      response // to update trips
    }
  };
};

export const fetchFavoriteTrips = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}/favorite-trips`);
      dispatch(receiveFavoriteTrips(response));
    } catch(e) {
      console.log('error fetching favorite trips', e);
    }
  }
};

export const receiveFavoriteTrips = (response) => {
  return {
    type: 'RECEIVE_FAVORITE_TRIPS',
    payload: {
      response
    }
  };
};

export const postFavoriteTrip = (userId, trip) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/favorite-trips`, {
          userId,
          trip
        }
      );
      if (response.data === 'Favorite trip successfully saved!') {
        dispatch(addTripToFavorites(trip));
      }
    } catch(e) {
      console.log('error posting favorite trip', e);
    }
  };
};

export const deleteFavoriteTrip = (userId, trip) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/favorite-trips`, {data: {
          userId,
          tripId: trip.id
        }
      });
      if (response.data === 'Favorite trip successfully deleted!') {
        dispatch(removeTripFromFavorites(trip));
      }
    } catch(e) {
      console.log('error deleting favorite trip', e);
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

export const fetchFavoriteLines = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}/favorite-lines`);
      dispatch(receiveFavoriteLines(response));
    } catch(e) {
      console.log('error fetching favorite lines', e);
    }
  }
};

export const receiveFavoriteLines = (response) => {
  return {
    type: 'RECEIVE_FAVORITE_LINES',
    payload: {
      response
    }
  };
};

export const addLineToFilter = (line) => {
  return {
    type: 'ADD_LINE',
    payload: {
      line
    }
  };
};

export const removeLineFromFilter = (line) => {
  return {
    type: 'REMOVE_LINE',
    payload: {
      line
    }
  };
};

export const addAllLinesToFilter = () => {
  return { type: 'ADD_ALL_LINES' };
};

export const removeAllLinesFromFilter = () => {
  return { type: 'REMOVE_ALL_LINES' };
};

