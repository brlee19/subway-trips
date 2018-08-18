import React, { Component } from 'react';
import { connect } from 'react-redux';

import Trip from '../components/Trip.js';
import { fetchTrips } from '../actions/apiActions.js';
import { selectTrip } from '../actions/tripsActions.js';

class TripsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrips({page: 1, route: null, sort: 'origin-departure'});
  }

  render() {
    return (
    <div>
        {this.props.trips.currentPage.map(trip => (
          <Trip trip={trip}
                selectTrip={this.props.selectTrip}
          />
        ))}
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: (params) => dispatch(fetchTrips(params)), // i.e. {page: 1, route: null, sort: 'origin-departure'}
  selectTrip: (trip) => dispatch(selectTrip(trip))
});

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer);