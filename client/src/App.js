import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Trip from './Trip.js';
import GoogleMap from './GoogleMap.js';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      trips: []
    };
  }

  componentDidMount = async() => {
    const response = await axios.get('/api/trips');
    try {
      this.setState({
        trips: response.data.data
      });
    } catch(e) {
      console.log('error', e)
    }
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Subway Trip Planner</h1>
        </header>
        <div className="trips-container">
          {this.state.trips.map(trip => (
            <Trip key={trip.id} trip={trip}/>
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
