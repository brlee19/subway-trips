export const selectArrival = (arrival) => {
  return {
    type: 'SELECT_ARRIVAL',
    payload: {
      arrival
    }
  };
};