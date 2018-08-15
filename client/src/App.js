import React, { Component } from 'react';
import './App.css';
import Trip from './components/Trip.js';
import GoogleMap from './components/GoogleMap.js';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      selectedTripId: '',
      arrivals: []
    };
    this.selectTrip = this.selectTrip.bind(this);
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
        arrivals: response.data.data
      });
    } catch(e) {
      console.error('error getting arrivals', e);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Subway Trip Planner</h1>
        </header>
        <div className="trips-container">
          {this.state.trips.map(trip => (
            <Trip key={trip.id} trip={trip} selectTrip={this.selectTrip}/>
          ))}
        </div>

        <div className="map-container">
          <GoogleMap />
        </div>
      </div>
    );
  }
}

export default App;
