const initialState = {
  center: { // remove if unable to make map center dynamic
    lat: 40.7128,
    lng: -74.0060
  },
  zoom: 11, // make dynamic if possible
  arrivals: {
    selectedTrip: null,
    selectedArrival: null,
    all: []
  }
};

const googleMap = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default googleMap;