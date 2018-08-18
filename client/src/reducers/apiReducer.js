const initialState = {
  source: { // the current source of data in the app
    pages: {
      current: null,
      first: null,
      last: null
    },
    sort: null,
    routes: [],
  },
  nextParams: { // the params being modified by the user before the request is sent off to the API
    page: 1,
    sort: 'origin-departure',
    routes: []
  }
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
        source: {
          pages: {
            current: page || null,
            first: Number(firstURL.searchParams.get('page[number]')),
            last: Number(lastURL.searchParams.get('page[number]')),
          },
          sort: sort || null,
          routes: routes || []
        }
      };
    }

    case 'ADD_LINE': {
      const { line } = action.payload;
      if (state.nextParams.routes.includes(line)) return state;
      return {
        ...state,
        nextParams: {
          ...state.nextParams,
          routes: [...state.nextParams.routes, line]
        }
      };
    }

    default:
      return state;
  }
};

export default api;