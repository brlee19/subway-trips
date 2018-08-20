import React, { Component } from 'react';
import { connect } from 'react-redux';

import Trip from '../components/Trip.js';
import NavButtons from '../components/NavButtons.js';
import { fetchTrips, postFavoriteTrip, deleteFavoriteTrip } from '../actions/apiActions.js';
import { selectTrip } from '../actions/tripsActions.js';

class TripsContainer extends Component {
  render() {
    const { trips, visibility, api, fetchPage, selectTrip,
            toggleTripFromFavorites} = this.props;
    const visibleTrips = applyVisibilityFilter(trips, visibility);
    return (
    <div>
    <NavButtons source={api.source} fetchPage={fetchPage} visibility={visibility}/>
    {visibleTrips.map(trip => (
      <Trip key={trip.id}
            trip={trip}
            userId={api.userId}
            selectTrip={(trip) => selectTrip(trips.selectedId, trip)}
            isFavorite={{
              trip: trips.favorites.map(faveTrip => faveTrip.id).includes(trip.id)
            }}
            toggleTripFromFavorites={toggleTripFromFavorites}
      />
    ))}
    </div>
    )
  }
}

// render logic
const applyVisibilityFilter = (trips, visibility) => {
  return trips[visibility.trips];
};

const mapStateToProps = (state) => {
  return {
    api: state.api,
    trips: state.trips.trips,
    lines: state.trips.lines,
    visibility: state.trips.visibility
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: (params) => dispatch(fetchTrips(params)), // i.e. {page: 1, route: null, sort: 'origin-departure'}
  fetchPage: (page, apiState) => {
    dispatch(fetchTrips({
      ...apiState, // change only page number
      page,
    }));
  },
  selectTrip: (currentSelectedId, trip) => {
    if (currentSelectedId !== trip.id) dispatch(selectTrip(trip));
  },
  toggleTripFromFavorites: (isFavorite, userId, trip) => {
    isFavorite ? dispatch(deleteFavoriteTrip(userId, trip)) : dispatch(postFavoriteTrip(userId, trip))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer);