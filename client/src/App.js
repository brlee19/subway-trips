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
      arrivals: [],
      mapCenter: {
        lat: 40.7128,
        lng: -74.0060
      },
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
        arrivals: response.data.data,
        mapCenter: this.calculateCentralCoordinates(response.data.data)
      });
    } catch(e) {
      console.error('error getting arrivals', e);
    }
  }

  calculateCentralCoordinates(arrivals) {
    // test case: works even when some coordinates are null
    // maybe add to some sort of utils file
    const arrivalsWithCoordinates = arrivals.filter((arrival) => {
      return arrival.attributes.latitude && arrival.attributes.longitude;
    })  

    const sumCoords = arrivalsWithCoordinates.reduce((coords, arrival) => {
      const { latitude, longitude } = arrival.attributes;
      return [
        coords[0] + parseFloat(latitude), 
        coords[1] + parseFloat(longitude)
      ]
    }, [0, 0]);

    return {
      lat: sumCoords[0] / arrivalsWithCoordinates.length,
      long: sumCoords[1] / arrivalsWithCoordinates.length
    };
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
          <GoogleMap arrivals={this.state.arrivals}
                     center={this.state.mapCenter}
          />
        </div>
      </div>
    );
  }
}

export default App;
