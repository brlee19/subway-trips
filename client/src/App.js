import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoriteSwitch from './components/FavoriteSwitch.js';
import LineFilter from './components/LineFilter.js';
import TripsContainer from './containers/TripsContainer';
import MapContainer from './containers/MapContainer.js';
import Spinner from './components/Spinner.js';

import { fetchTrips } from './actions/apiActions.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchTrips({page: 1, routes: [], sort: 'origin-departure'});
  }

  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <h1 className="App-title">Subway Trip Planner</h1>
        </header>
  
        <div className="filter-controls">
          <FavoriteSwitch />
        </div>
        
        <div className="line-filter">
          <LineFilter />
        </div>
  
        <div className="trips-container">
          {this.props.tripStatus.isLoading ? <Spinner /> : <TripsContainer />}
          
        </div>
        
        <div className="map-container">
          <MapContainer />
        </div>
  
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    tripStatus: state.trips.status
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: (params) => dispatch(fetchTrips(params)) // i.e. {page: 1, route: null, sort: 'origin-departure'}
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
