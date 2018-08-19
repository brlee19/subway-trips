import React from 'react';

import FavoriteSwitch from './components/FavoriteSwitch.js';
import LineFilter from './components/LineFilter.js';
import TripsContainer from './containers/TripsContainer';
import MapContainer from './containers/MapContainer.js';

import './App.css';

const App = () => {
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
        <TripsContainer />
      </div>
      
      <div className="map-container">
        <MapContainer />
      </div>

    </div>
  );
};

export default App;
