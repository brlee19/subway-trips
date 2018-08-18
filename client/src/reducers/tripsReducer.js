import moment from 'moment';

const initialState = {
  currentPage: [], // [trip objects]
  favorites: [], //[trip objects]
  selectedId: '', // string/number
  visibleIds: [] // [trip ids]
}

const trips = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_TRIPS': {
      const fetchedTrips = formatTrips(action.payload.response.data.data);
      return {
        ...state,
        currentPage: fetchedTrips,
        visibleIds: fetchedTrips.map(trip => trip.id)
      };
    }

    case 'RECEIVE_ARRIVALS': {
      return {
        ...state,
        selectedId: action.payload.tripId
      };
    }

    default:
      return state;
  }
};

export default trips;

// export const fetchTrips = async (apiState) => {
//   const { page, sort, route } = apiState;
//   // add more query assembly logic
//   const response = await axios.get('https://nooklyn-interview.herokuapp.com/trips', {params: {
//     'page[number]': page,
//     'filter[route]': route,
//     sort
//     // 'filter[route]': 'F',
//   }});
//   return formatTrips(response.data.data);
// };

// export const fetchArrivals = (tripId) => {
//   return axios.get(`https://nooklyn-interview.herokuapp.com/trips/${tripId}/arrivals`);
// };

// move to separate file if getting too long

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
