// redux documentation example
// export function fetchPosts(subreddit) {
//     return function (dispatch) {
//       dispatch(requestPosts(subreddit))
//       return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//         .then(
//           response => response.json(),
//           error => console.log('An error occurred.', error)
//         )
//         .then(json =>
//           dispatch(receivePosts(subreddit, json))
//         )
//     }
//   }

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

