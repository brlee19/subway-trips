import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMap from './components/GoogleMap.js';
import FavoriteSwitches from './components/FavoriteSwitches.js';

import './App.css';
import TripsContainer from './containers/TripsContainer';
import { displayFavoriteTrips, displayCurrentPageTrips, displayFavoriteLines, displayAllLines } from './actions/tripsActions';

class App extends Component {
  constructor() {
    super();
  }

  resetLineVisibility() {
    this.setState({
      lines: {
        ...this.state.lines,
        visible: [...this.state.lines.all]
      }
    })
  }

  toggleLineVisibility() {
    if (this.state.lines.visible.length !== this.state.lines.all.length) {
      this.resetLineVisibility();
    } else {
      this.displayFavoriteLinesOnly();
    }

    this.setState({
      switches: {
        ...this.state.switches,
        favoriteLines: !this.state.switches.favoriteLines
      }
    });
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
          {/* these buttons should get the previous/next pages of favorites when in favorite trips mode */}
          {/* <button onClick={() => this.getTrips({
            page: this.state.api.page - 1
          })}>Previous</button>
          <button onClick={() => this.getTrips({ //move out of inline, validate, keep rest of params
            page: this.state.api.page + 1
          })}>Next</button>
          {allTrips.filter(trip => this.shouldDisplayTrip(trip)) // need to change allTrips to unique trips in currentPage or faves
                   .map(trip => {
                     return (
            <Trip key={trip.id}
                  trip={trip}
                  selectTrip={this.selectTrip}
                  isFavorite={{
                    line: this.state.lines.favorites.includes(trip.attributes.route),
                    trip: this.state.trips.favorites.map(faveTrip => faveTrip.id).includes(trip.id)
                  }}
                  toggleLineFromFavorites={
                    this.state.lines.favorites.includes(trip.attributes.route) ?
                    this.removeLineFromFavorites : this.addLineToFavorites 
                  }
                  toggleTripFromFavorites={
                    this.state.trips.favorites.map(faveTrip => faveTrip.id).includes(trip.id) ?
                    this.removeTripFromFavorites : this.addTripToFavorites
                  }
            />
          )})} */}

        {/* <div className="map-container">
          <GoogleMap arrivals={this.state.arrivals}
                     center={this.state.mapCenter}
          />
        </div> */}
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
