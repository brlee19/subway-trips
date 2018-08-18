import axios from 'axios';
  
export const fetchTrips = (params) => {
  const { page, sort, route } = params;
  return async (dispatch) => {
    // dispatch(requestTrips(apiState)); // not necessary no spinner needed?
    try {
      const response = await axios.get('https://nooklyn-interview.herokuapp.com/trips', {params: {
        'page[number]': page,
        'filter[route]': route,
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
