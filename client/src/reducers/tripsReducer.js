import moment from 'moment';

const initialState = {
  trips: {
    currentPage: [], // trip objects
    favorites: [], // trip objects
    selectedId: '' // tripId
  },
  arrivals: [], // arrival objects
  visibility: {
    trips: 'currentPage', // 'currentPage' or 'favorites'
    lines: 'all' // 'all' or 'favorites' or 'filter'
  }
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_TRIPS': {
      const fetchedTrips = formatTrips(action.payload.response.data.data);
      return {
        ...state,
        trips: {
          ...state.trips,
          currentPage: fetchedTrips,
          selectedId: ''
        },
        arrivals: [],
        visibility: {
          ...state.visibility,
          trips: 'currentPage'
        }
      };
    }

    case 'RECEIVE_ARRIVALS': {
      const arrivals = formatArrivals(action.payload.response.data.data);
      return {
        ...state,
        trips: {
          ...state.trips,
          selectedId: action.payload.tripId
        },
        arrivals
      };
    }

    case 'ADD_FAVORITE_TRIP': {
      const { trip } = action.payload;
      return {
        ...state,
        trips: {
          ...state.trips,
          favorites: [...state.trips.favorites, trip]
        }
      };
    }

    case 'REMOVE_FAVORITE_TRIP': {
      const { trip } = action.payload;
      return {
        ...state,
        trips: {
          ...state.trips,
          favorites: state.trips.favorites.filter(faveTrip => faveTrip.id !== trip.id)
        }
      };
    }

    case 'DISPLAY_FAVORITE_TRIPS': {
      return {
        ...state,
        visibility: {
          ...state.visibility,
          trips: 'favorites'
        }
      };
    }

    case 'DISPLAY_CURRENT_PAGE_TRIPS': {
      return {
        ...state,
        visibility: {
          ...state.visibility,
          trips: 'currentPage'
        }
      };
    }

    default:
      return state;
  }
};

export default trips;

const formatTime = (timeStamp) => {
  return moment(timeStamp).format('MMM DD h:mm A');
};

const formatTrips = (trips) => {
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

const formatArrivals = (arrivals) => {
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
