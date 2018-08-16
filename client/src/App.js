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
      arrivals: [],
      trips : {
        all: [],
        selected: '',
        favorites: [],
        visible: []
      },
      lines: {
        all: [],
        favorites: [],
        visible: []
      },
      visibility: 'all', // can also be 'favoriteTrips' or 'favoriteLines' 
      mapCenter: { // remove if unable to make map center dynamic
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
    // keep here because this call should only be made once per app lifecycle
    try {
      const response = await axios.get('/api/trips');
      const uniqueLines = [...new Set(response.data.data.map(trip => trip.attributes.route))];
      console.log('uniqueLines are', uniqueLines)
      this.setState({
        trips: {
          ...this.state.trips,
          all: response.data.data,
          visible: response.data.data.map(trip => trip.id)
        },
        lines: {
          ...this.state.lines,
          all: [...uniqueLines],
          visible: [...uniqueLines]
        }
      });
    } catch(e) {
      console.error('error getting all trips', e)
    }
  }

  async selectTrip(id) {
    if (id === this.state.trips.selected) return;

    try {
      const response = await axios.get(`/api/trips/${id}/arrivals`);
      console.log('arrivals are', response.data.data)
      this.setState({
        trips: {
          ...this.state.trips,
          selected: id
        },
        arrivals: response.data.data,
        mapCenter: calculateCentralCoordinates(response.data.data)
      });
    } catch(e) {
      console.error('error getting arrivals', e);
    }
  }

  addLineToFavorites(trip) {
    const line = trip.attributes.route;
    if (this.state.lines.favorites.includes(line)) return;

    this.setState({
      lines: {
        ...this.state.lines,
        favorites: [
          ...this.state.lines.favorites,
          line
        ]
      }
    });
  }

  removeLineFromFavorites(trip) {
    const line = trip.attributes.route;
    if (!this.state.lines.favorites.includes(line)) return;

    this.setState({
      lines: {
        ...this.state.lines,
        favorites: [
          this.state.lines.favorites.filter(favLine => favLine !== line)
        ]
      }
    });
  }

  addTripToFavorites(trip) {
    const tripId = trip.id;
    if (this.state.trips.favorites.includes(tripId)) return;

    this.setState({
      trips: {
        ...this.state.trips,
        favorites: [
          ...this.state.trips.favorites,
          tripId
        ]
      }
    });
  }

  removeTripFromFavorites(trip) {
    const tripId = trip.id;
    if (!this.state.trips.favorites.includes(tripId)) return;
    
    this.setState({
      trips: {
        ...this.state.trips,
        favorites: this.state.trips.favorites.filter(faveTrip => faveTrip !== tripId)
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
          {this.state.trips.all.filter(trip => this.state.trips.visible.includes(trip.id))
                               .map(trip => (
            <Trip key={trip.id}
                  trip={trip}
                  selectTrip={this.selectTrip}
                  isFavorite={{
                    line: this.state.lines.favorites.includes(trip.attributes.route),
                    trip: this.state.trips.favorites.includes(trip.id)
                  }}
                  toggleLineFromFavorites={
                    this.state.lines.favorites.includes(trip.attributes.route) ?
                    this.removeLineFromFavorites : this.addLineToFavorites 
                  }
                  toggleTripFromFavorites={
                    this.state.trips.favorites.includes(trip.id) ?
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
