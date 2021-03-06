import { formatArrivals, formatTrips} from '../constants.js';

const initialState = {
  status: {
    isLoading: false,
    error: false
  },
  trips: {
    currentPage: [], // trip objects
    favorites: [], // trip objects
    selectedId: '' // tripId
  },
  arrivals: [], // arrival objects
  visibility: {
    trips: 'currentPage' // 'currentPage' or 'favorites'
  }
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_TRIPS': {
      const fetchedTrips = formatTrips(action.payload.response.data.data);
      return {
        ...state,
        status: {
          isLoading: false,
          error: false,
        },
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

    case 'RECEIVE_FAVORITE_TRIPS': {
      const fetchedFavoriteTrips = formatTrips(action.payload.response.data);
      return {
        ...state,
        trips: {
          ...state.trips,
          favorites: [...fetchedFavoriteTrips]
        },
      };
    }

    case 'REQUEST_TRIPS': {
      return {
        ...state,
        status: {
          isLoading: true,
          error: false
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
      if (state.trips.favorites.map(faveTrip => faveTrip.id).includes(trip.id)) {
        return state
      };

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