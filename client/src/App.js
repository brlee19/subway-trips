import React, { Component } from 'react';
import { connect } from 'react-redux';

import MapContainer from './containers/MapContainer.js';
import FavoriteSwitch from './components/FavoriteSwitch.js';
import LineFilter from './components/LineFilter.js';

import './App.css';
import TripsContainer from './containers/TripsContainer';
import { displayFavoriteTrips, displayCurrentPageTrips, displayFavoriteLines, displayAllLines } from './actions/tripsActions';
import { addLineToFilter, removeLineFromFilter, fetchTrips } from './actions/apiActions.js';

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
          <FavoriteSwitch />
          <button onClick={() => this.props.fetchTrips(this.props.api.nextParams)}>Search using current params</button>
        </div>
        
        <div className="line-filter">
          <LineFilter />
        </div>

        <div className="trips-container">
          <TripsContainer />
        </div>
        
        <div className="map-container">
          <MapContainer />
        </div>
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
    api: state.api
  };
};

const mapDispatchToProps = (dispatch) => ({
  displayFavoriteTrips: () => dispatch(displayFavoriteTrips()),
  displayCurrentPageTrips: () => dispatch(displayCurrentPageTrips()),
  displayFavoriteLines: () => dispatch(displayFavoriteLines()),
  displayAllLines: () => dispatch(displayAllLines()),
  addLineToFilter: (line) => dispatch(addLineToFilter(line)),
  removeLineFromFilter: (line) => dispatch(removeLineFromFilter(line)),
  fetchTrips: (params) => dispatch(fetchTrips(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
