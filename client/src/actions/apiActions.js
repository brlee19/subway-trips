import axios from 'axios';
  
export const fetchTrips = (params) => {
  const { page, sort, routes } = params;
  return async (dispatch) => {
    // dispatch(requestTrips(apiState)); // not necessary no spinner needed?
    try {
      const response = await axios.get('https://nooklyn-interview.herokuapp.com/trips', {params: {
        'page[number]': page,
        'filter[route]': routes,
        sort
      }});
      dispatch(receiveTrips(params, response));
    } catch(e) {
      console.log('error fetching trips', e);
      //dispatch error state if using spinner, etc
    }
  }
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

