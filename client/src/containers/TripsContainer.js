import { connect } from 'react-redux';
import React, { Component } from 'react';
import Trip from '../components/Trip.js';

class TripsContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (this.props.trips.currentPage.map(trip => (
      <Trip trip={trip}/>
    )))
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TripsContainer);