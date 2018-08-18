import React, { Component } from 'react';
import { connect } from 'react-redux';

import Trip from '../components/Trip.js';
import { fetchTrips } from '../actions/apiActions.js';
import { selectTrip, addTripToFavorites, removeTripFromFavorites } from '../actions/tripsActions.js';
import '../App.css';

class TripsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrips({page: 1, route: null, sort: 'origin-departure'});
  }

  render() {
    const { trips } = this.props;
    const allTrips = uniqueTrips([...trips.currentPage, ...trips.favorites]);
    const visibleTrips = allTrips.filter(trip => trips.visibleIds.includes(trip.id));
    return (
    <div className="trips-container">
        {visibleTrips.map(trip => (
          <Trip key={trip.id}
                trip={trip}
                selectTrip={(trip) => this.props.selectTrip(trips.selectedId, trip)}
                isFavorite={trips.favorites.map(faveTrip => faveTrip.id).includes(trip.id)}
                toggleTripFromFavorites={this.props.toggleTripFromFavorites}
          />
        ))}
    </div>
    )
  }
}

const uniqueTrips = (trips) => {
  return trips.reduce((uniqueTrips, trip) => {
    if (!uniqueTrips.map(uniqueTrip => uniqueTrip.id).includes(trip.id)) uniqueTrips.push(trip);
    return uniqueTrips;
  }, []);
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: (params) => dispatch(fetchTrips(params)), // i.e. {page: 1, route: null, sort: 'origin-departure'}
  selectTrip: (currentSelectedId, trip) => {
    if (currentSelectedId !== trip.id) dispatch(selectTrip(trip));
  },
  addTripToFavorites: (trip) => {
    dispatch(addTripToFavorites(trip));
  },
  removeTripFromFavorites: (trip) => {
    dispatch(removeTripFromFavorites(trip));
  },
  toggleTripFromFavorites: (isFavorite, trip) => {
    isFavorite ? dispatch(removeTripFromFavorites(trip)) : dispatch(addTripToFavorites(trip))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer);