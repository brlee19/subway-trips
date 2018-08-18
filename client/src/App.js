import React, { Component } from 'react';
import { connect } from 'react-redux';

import MapContainer from './containers/MapContainer.js';
import FavoriteSwitches from './components/FavoriteSwitches.js';

import './App.css';
import TripsContainer from './containers/TripsContainer';
import { displayFavoriteTrips, displayCurrentPageTrips, displayFavoriteLines, displayAllLines } from './actions/tripsActions';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Subway Trip Planner</h1>
        </header>

        <div className="filter-controls">
        <FavoriteSwitches
          trips={{
            checked: this.props.trips.visibility.trips === 'favorites',
            onChange: this.props.trips.visibility.trips === 'favorites' ? this.props.displayCurrentPageTrips : this.props.displayFavoriteTrips
          }}
          lines={{
            checked: this.props.trips.visibility.lines === 'favorites',
            onChange: this.props.trips.visibility.lines === 'favorites' ? this.props.displayAllLines : this.props.displayFavoriteLines
          }}
          
        />
        </div>
        <TripsContainer />
        <div className="map-container">
          <MapContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips
  };
};

const mapDispatchToProps = (dispatch) => ({
  displayFavoriteTrips: () => dispatch(displayFavoriteTrips()),
  displayCurrentPageTrips: () => dispatch(displayCurrentPageTrips()),
  displayFavoriteLines: () => dispatch(displayFavoriteLines()),
  displayAllLines: () => dispatch(displayAllLines())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
