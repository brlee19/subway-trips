import React, { Component } from 'react';
import { connect } from 'react-redux';

import Trip from '../components/Trip.js';
import { fetchTrips } from '../actions/apiActions.js';
import { selectTrip, addTripToFavorites, removeTripFromFavorites,
         addLineToFavorites, removeLineFromFavorites } from '../actions/tripsActions.js';
import '../App.css';

class TripsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrips({page: 1, route: null, sort: 'origin-departure'});
  }

  render() {
    const { trips, lines, visibility } = this.props;
    // const allTrips = uniqueTrips([...trips.currentPage, ...trips.favorites]);
    const visibleTrips = applyVisibilityFilters(trips, lines, visibility);
    return (
    <div className="trips-container">
        {visibleTrips.map(trip => (
          <Trip key={trip.id}
                trip={trip}
                selectTrip={(trip) => this.props.selectTrip(trips.selectedId, trip)}
                isFavorite={{
                  trip: trips.favorites.map(faveTrip => faveTrip.id).includes(trip.id),
                  line: lines.favorites.includes(trip.attributes.route)
                }}
                toggleTripFromFavorites={this.props.toggleTripFromFavorites}
                toggleLineFromFavorites={this.props.toggleLineFromFavorites}
          />
        ))}
    </div>
    )
  }
}

// const uniqueTrips = (trips) => {
//   return trips.reduce((uniqueTrips, trip) => {
//     if (!uniqueTrips.map(uniqueTrip => uniqueTrip.id).includes(trip.id)) uniqueTrips.push(trip);
//     return uniqueTrips;
//   }, []);
// };

const applyVisibilityFilters = (trips, lines, visibility) => {
  const visibleTrips = applyTripFilters(trips, visibility.trips);
  return applyLineFilters(visibleTrips, lines, visibility.lines);
};

const applyTripFilters = (trips, visibility) => {
  return trips[visibility]; // visibility is either 'currentPage' or 'favorites
};

const applyLineFilters = (trips, lines, lineVisibility) => {
  const visibleLines = lines[lineVisibility]; //
  return trips.filter(trip => visibleLines.includes(trip.attributes.route));
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips.trips,
    lines: state.trips.lines,
    visibility: state.trips.visibility
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: (params) => dispatch(fetchTrips(params)), // i.e. {page: 1, route: null, sort: 'origin-departure'}
  selectTrip: (currentSelectedId, trip) => {
    if (currentSelectedId !== trip.id) dispatch(selectTrip(trip));
  },
  toggleTripFromFavorites: (isFavorite, trip) => {
    isFavorite ? dispatch(removeTripFromFavorites(trip)) : dispatch(addTripToFavorites(trip))
  },
  toggleLineFromFavorites: (isFavorite, line) => {
    isFavorite ? dispatch(removeLineFromFavorites(line)) : dispatch(addLineToFavorites(line))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer);