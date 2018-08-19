export const selectArrival = (arrival) => {
  return {
    type: 'SELECT_ARRIVAL',
    payload: {
      arrival
    }
  };
};

export const updateMap = (center, zoom) => {
  return {
    type: 'RECENTER_MAP',
    payload: {
      center,
      zoom
    }
  };
};