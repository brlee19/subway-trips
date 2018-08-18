const initialState = {
  page: null,
  sort: null,
  route: null,
};

const api = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_TRIPS': {
      alert('got to the reduca!')
      const { page, sort, routes } = action.payload.params;
      return {
        ...state,
        page: page || null,
        sort: sort || null,
        routes: routes || [] 
      };
    }

    default:
      return state;
  }
};

export default api;