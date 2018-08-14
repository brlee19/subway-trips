const sortTripsByDate = (trip1, trip2) => {
  return new Date(trip1.attributes['origin-departure']) - new Date(trip2.attributes['origin-departure'])
};