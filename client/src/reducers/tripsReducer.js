import moment from 'moment';

const initialState = {
  trips: {
    currentPage: [], // trip objects
    favorites: [], // trip objects
    selectedId: '' // tripId
  },
  arrivals: [], // arrival objects
  lines: {
    all: ['1', '2', '3', '4', '5', '6', '7', 'A', 'C', 'E', 'B', 'D', 'F', 'M',
          'G', 'J', 'Z', 'L', 'N', 'Q', 'R', 'W', 'S'],
    favorites: []
  },
  visibility: {
    trips: 'currentPage', // 'currentPage' or 'favorites'
    lines: 'all' // 'all' or 'favorites' or 'filter'
  }
};

// compute ids to display based on state, don't store in state itself


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
      // alert('receiving arrivals')
      const arrivals = action.payload.response.data.data;
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

    case 'ADD_FAVORITE_LINE': {
      const { line } = action.payload;
      return {
        ...state,
        lines: {
          ...state.lines,
          favorites: [...state.lines.favorites, line]
        }
      };
    }

    case 'REMOVE_FAVORITE_LINE': {
      const { line } = action.payload;
      return {
        ...state,
        lines: {
          ...state.lines,
          favorites: state.lines.favorites.filter(faveLine => faveLine !== line)
        }
      };
    }

    case 'DISPLAY_FAVORITE_LINES': {
      return {
        ...state,
        visibility: {
          ...state.visibility,
          lines: 'favorites'
        }
      };
    }

    case 'DISPLAY_ALL_LINES': {
      return {
        ...state,
        visibility: {
          ...state.visibility,
          lines: 'all'
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
        'origin-departure': formatTime(trip.attributes['origin-departure'])
      }
    }
  });
}
