import moment from 'moment';

const initialState = {
  currentPage: [], // [trip objects]
  favorites: [], //[trip objects]
  selectedId: '', // string/number
  visibleIds: [], // [trip ids]
  visibility: null // can be 'favorites' or 'currentPage'
}

const trips = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_TRIPS': {
      const fetchedTrips = formatTrips(action.payload.response.data.data);
      return {
        ...state,
        currentPage: fetchedTrips,
        visibleIds: fetchedTrips.map(trip => trip.id),
        visibilityFilter: 'currentPage'
      };
    }

    case 'RECEIVE_ARRIVALS': {
      // alert('receiving arrivals')
      return {
        ...state,
        selectedId: action.payload.tripId
      };
    }

    case 'ADD_FAVORITE_TRIP': {
      const { trip } = action.payload;
      return {
        ...state,
        favorites: [
          ...state.favorites,
          trip
        ]
      };
    }

    case 'REMOVE_FAVORITE_TRIP': {
      const { trip } = action.payload;
      return {
        ...state,
        favorites: state.favorites.filter(faveTrip => faveTrip.id !== trip.id),
        visibleIds: state.visibleIds.filter(visibleId => visibleId !== trip.id)
      };
    }

    case 'DISPLAY_FAVORITE_TRIPS': {
      return {
        ...state,
        visibleIds: [...state.favorites.map(trip => trip.id)],
        visibility: 'favorites'
      };
    }

    case 'DISPLAY_CURRENT_PAGE_TRIPS': {
      return {
        ...state,
        visibleIds: [...state.currentPage.map(trip => trip.id)],
        visibility: 'currentPage'
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
