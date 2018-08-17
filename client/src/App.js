import React, { Component } from 'react';
import './App.css';
import { fetchTrips, fetchArrivals } from './utils/utils.js'; //rename to APIs
import Trip from './components/Trip.js';
import GoogleMap from './components/GoogleMap.js';
import { calculateCentralCoordinates } from './utils/utils.js'; //necessary?

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      api: { //state needed to format query to api
        page: null,
        sort: null,
        filters: []
      },
      arrivals: [],
      trips : {
        all: [],
        selected: '',
        favorites: [], //needs to store entire trip object
        visible: []
      },
      lines: {
        all: [],
        favorites: [],
        visible: []
      },
      switches: {
        favoriteTrips: false,
        favoriteLines: false
      },
      visibility: 'all', // can also be 'favoriteTrips' or 'favoriteLines' 
      mapCenter: { // remove if unable to make map center dynamic
        lat: 40.7128,
        lng: -74.0060
      },
    };

    this.getTrips = this.getTrips.bind(this);
    this.selectTrip = this.selectTrip.bind(this);
    this.addLineToFavorites = this.addLineToFavorites.bind(this);
    this.removeLineFromFavorites = this.removeLineFromFavorites.bind(this);
    this.addTripToFavorites = this.addTripToFavorites.bind(this);
    this.removeTripFromFavorites = this.removeTripFromFavorites.bind(this);
    this.shouldDisplayTrip = this.shouldDisplayTrip.bind(this);
    this.displayFavoriteTripsOnly = this.displayFavoriteTripsOnly.bind(this);
    this.resetTripVisibility = this.resetTripVisibility.bind(this);
    this.displayFavoriteLinesOnly = this.displayFavoriteLinesOnly.bind(this);
    this.resetLineVisibility = this.resetLineVisibility.bind(this);
    this.toggleTripVisibility = this.toggleTripVisibility.bind(this);
    this.toggleLineVisibility = this.toggleLineVisibility.bind(this);
  }

  async componentDidMount() {
    this.getTrips({page: 1}); //empty object meaning no specific trip params applied
  }

  async getTrips(tripParams) { // custom obj
    try {
      const response = await fetchTrips(tripParams);
      const uniqueLines = [...new Set(response.data.data.map(trip => trip.attributes.route))];
      console.log('uniqueLines are', uniqueLines)
      this.setState({
        api: {
          page: tripParams.page || null, // so the state object keeps its shape
          sort: tripParams.sort || null,
          filters: tripParams.filters || []
        },
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
      console.error('error getting all trips', e) // have error state to display error in UI?
    }
  }

  async selectTrip(id) {
    if (id === this.state.trips.selected) return;

    try {
      const response = await fetchArrivals(id);
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

  shouldDisplayTrip(trip) {
    const { trips, lines } = this.state;
    return trips.visible.includes(trip.id) && lines.visible.includes(trip.attributes.route);
  }

  displayFavoriteTripsOnly() {
    this.setState({
      trips: {
        ...this.state.trips,
        visible: [...this.state.trips.favorites]
      }
    });
  }

  resetTripVisibility() {
    this.setState({
      trips: {
        ...this.state.trips,
        visible: [...this.state.trips.all.map(trip => trip.id)]
      }
    })
  }

  toggleTripVisibility() {
    // only checks to see if visible trips length is less than all
    // may not work anymore if more complex visibilities are set
    if (this.state.trips.visible.length !== this.state.trips.all.length) {
      this.resetTripVisibility();
    } else {
      this.displayFavoriteTripsOnly();
    }

    this.setState({
      switches: {
        ...this.state.switches,
        favoriteTrips: !this.state.switches.favoriteTrips
      }
    });
  }

  displayFavoriteLinesOnly() {
    this.setState({
      lines: {
        ...this.state.lines,
        visible: [...this.state.lines.favorites]
      }
    });
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
    const allTrips = this.state.trips.all;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Subway Trip Planner</h1>
        </header>

        <div className="filter-controls">
        {/* TODO add to own component! */}
          <FormGroup row className="filter-buttons">
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.switches.favoriteTrips}
                  onChange={this.toggleTripVisibility}
                  value="checkedA"
                />
              }
              label="Show favorite trips only"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.switches.favoriteLines}
                  onChange={this.toggleLineVisibility}
                />
              }
            label="Show favorite lines only"
            />
          </FormGroup>
        </div>

        <div className="trips-container">
          <button onClick={() => this.getTrips({
            page: this.state.api.page - 1
          })}>Previous</button>
          <button onClick={() => this.getTrips({ //move out of inline, validate, keep rest of params
            page: this.state.api.page + 1
          })}>Next</button>
          {allTrips.filter(trip => this.shouldDisplayTrip(trip))
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
