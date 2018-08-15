import React, { Component } from 'react';
import './App.css';
import Trip from './components/Trip.js';
import GoogleMap from './components/GoogleMap.js';
import { calculateCentralCoordinates } from './utils/utils.js';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      selectedTripId: '',
      favorites: {
        lines: [],
        trips: []
      },
      arrivals: [],
      mapCenter: {
        lat: 40.7128,
        lng: -74.0060
      },
    };

    this.selectTrip = this.selectTrip.bind(this);
    this.addLineToFavorites = this.addLineToFavorites.bind(this);
    this.removeLineFromFavorites = this.removeLineFromFavorites.bind(this);
    this.addTripToFavorites = this.addTripToFavorites.bind(this);
    this.removeTripFromFavorites = this.removeTripFromFavorites.bind(this);
  }

  async componentDidMount() {
    // move to own function in case it needs to be called indepdently
    try {
      const response = await axios.get('/api/trips');
      this.setState({
        trips: response.data.data
      });
    } catch(e) {
      console.error('error getting all trips', e)
    }
  }

  async selectTrip(id) {
    if (id === this.state.selectedTripId) return;

    try {
      const response = await axios.get(`/api/trips/${id}/arrivals`);
      console.log('arrivals are', response.data.data)
      this.setState({
        selectedTripId: id,
        arrivals: response.data.data,
        mapCenter: calculateCentralCoordinates(response.data.data)
      });
    } catch(e) {
      console.error('error getting arrivals', e);
    }
  }

  addLineToFavorites(trip) {
    const line = trip.attributes.route;
    if (this.state.favorites.lines.includes(line)) return;

    this.setState({
      favorites: {
        ...this.state.favorites,
        lines: [
          ...this.state.favorites.lines,
          line
        ]
      }
    });
  }

  removeLineFromFavorites(trip) {
    const line = trip.attributes.route;
    if (!this.state.favorites.lines.includes(line)) return;

    this.setState({
      favorites: {
        ...this.state.favorites,
        lines: this.state.favorites.lines.filter(favoriteLine => favoriteLine !== line)
      }
    });
  }

  addTripToFavorites(trip) {
    const tripId = trip.id;
    if (this.state.favorites.trips.includes(tripId)) return;

    this.setState({
      favorites: {
        ...this.state.favorites,
        trips: [
          ...this.state.favorites.trips,
          tripId
        ]
      }
    });
  }

  removeTripFromFavorites(trip) {
    const tripId = trip.id;
    if (!this.state.favorites.trips.includes(tripId)) return;
    
    this.setState({
      favorites: {
        ...this.state.favorites,
        trips: this.state.favorites.trips.filter(trip => trip !== tripId)
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Subway Trip Planner</h1>
        </header>
        <div className="trips-container">
          {this.state.trips.map(trip => (
            <Trip key={trip.id}
                  trip={trip}
                  selectTrip={this.selectTrip}
                  toggleLineFromFavorites={
                    this.state.favorites.lines.includes(trip.attributes.route) ?
                    this.removeLineFromFavorites : this.addLineToFavorites 
                  }
                  toggleTripFromFavorites={
                    this.state.favorites.trips.includes(trip.id) ?
                    this.removeTripFromFavorites : this.addTripToFavorites
                  }

            />
          ))}
        </div>

        <div className="map-container">
          <GoogleMap arrivals={this.state.arrivals}
                     center={this.state.mapCenter}
          />
        </div>
      </div>
    );
  }
}

export default App;
