const initialState = {
  pages: {
    current: null,
    first: null,
    last: null
  },
  sort: null,
  routes: [],
};

const api = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_TRIPS': {
      const { page, sort, routes } = action.payload.params;
      const links = action.payload.response.data.links;
      const firstURL = new URL(links.first);
      const lastURL = new URL(links.last);
      return {
        ...state,
        pages: {
          current: page || null,
          first: Number(firstURL.searchParams.get('page[number]')),
          last: Number(lastURL.searchParams.get('page[number]')),
        },
        sort: sort || null,
        routes: routes || [] 
      };
    }

    default:
      return state;
  }
};

export default api;