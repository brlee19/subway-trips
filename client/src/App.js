import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
      console.log('response is ', response.data)
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
            <div key={trip.id}>
              <img src={trip.attributes['route-image-url']} alt={trip.attributes.route}/>
              Origin-Departure: {trip.attributes['origin-departure']}<br/>
              Destination: {trip.attributes.destination}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
