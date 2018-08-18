import React, { Component } from 'react';
import './App.css';
import { fetchTrips, fetchArrivals } from './utils/utils.js'; //rename to APIs
import Trip from './components/Trip.js';
import GoogleMap from './components/GoogleMap.js';
import FavoriteSwitches from './components/FavoriteSwitches.js';
import { calculateCentralCoordinates } from './utils/utils.js'; //necessary?

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
        currentPage: [],
        favorites: [], //needs to store entire trip object
        selectedId: '',
        visibleIds: []
      },
      lines: {
        all: [],
        favorites: [],
        visible: []
      },
      switches: { // needs to be its own state?
        favoriteTrips: false,
        favoriteLines: false
      },
      visibility: 'all', // can also be 'favoriteTrips' or 'favoriteLines' ... needed?
      mapCenter: { // remove if unable to make map center dynamic
        lat: 40.7128,
        lng: -74.0060
      }
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
      this.setState({
        api: {
          page: tripParams.page || null, // so the state object keeps its shape
          sort: tripParams.sort || null,
          filters: tripParams.filters || []
        },
        trips: {
          ...this.state.trips,
          currentPage: response.data.data,
          visibleIds: response.data.data.map(trip => trip.id)
        },
        lines: {
          ...this.state.lines,
          all: [...uniqueLines],
          visible: [...uniqueLines]
        },
        switches: { // reset visibility to show current page trips
          favoriteTrips: false,
          favoriteLines: false
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
    if (this.state.trips.favorites.map(faveTrip => faveTrip.id).includes(trip.id)) return; // can refactor to sep fn like hasMatchingId
    this.setState({
      trips: {
        ...this.state.trips,
        favorites: [
          ...this.state.trips.favorites,
          trip
        ]
      }
    });
  }

  removeTripFromFavorites(trip) {
    if (!this.state.trips.favorites.map(faveTrip => faveTrip.id).includes(trip.id)) return;
    this.setState({
      trips: {
        ...this.state.trips,
        favorites: this.state.trips.favorites.filter(faveTrip => faveTrip.id !== trip.id),
        visibleIds: this.state.trips.visibleIds.filter(visibleId => visibleId !== trip.id)
      }
    });
  }

  shouldDisplayTrip(trip) {
    const { trips, lines } = this.state; //add line logic back in later
    console.log('determing whether or not to display trip', trip.id, trips.visibleIds.includes(trip.id));
    return trips.visibleIds.includes(trip.id);
  }

  displayFavoriteTripsOnly() {
    this.setState({
      trips: {
        ...this.state.trips,
        visibleIds: [...this.state.trips.favorites.map(faveTrip => faveTrip.id)]
      }
    });
  }

  resetTripVisibility() {
    this.setState({
      trips: {
        ...this.state.trips,
        visibleIds: [...this.state.trips.currentPage.map(trip => trip.id)]
      }
    })
  }

  toggleTripVisibility() {
    // TODO: Change! not robust enough logic, prob best to store current vis filter in state
    if (this.state.trips.visibleIds.length !== this.state.trips.currentPage.length) {
      this.resetTripVisibility();
    } else {
      this.displayFavoriteTripsOnly();
    }

    this.setState({ // maybe can just be local state
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
    // const allTrips = Array.from(new Set([...this.state.trips.currentPage, ...this.state.trips.favorites]));
    const allTrips = [...this.state.trips.currentPage, ...this.state.trips.favorites].reduce((uniqueTrips, trip) => {
      if (!uniqueTrips.map(uniqueTrip => uniqueTrip.id).includes(trip.id)) uniqueTrips.push(trip);
      return uniqueTrips;
    }, []); //unit test this for uniqueness!
    console.log('allTripIds are', allTrips.map(trip => trip.id))
    console.log('uniqueTrips are', JSON.stringify(allTrips))
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Subway Trip Planner</h1>
        </header>

        <div className="filter-controls">
        <FavoriteSwitches
          checked={this.state.switches.favoriteTrips}
          onChange={this.toggleTripVisibility}
        />
        </div>

        <div className="trips-container">
          {/* these buttons should get the previous/next pages of favorites when in favorite trips mode */}
          <button onClick={() => this.getTrips({
            page: this.state.api.page - 1
          })}>Previous</button>
          <button onClick={() => this.getTrips({ //move out of inline, validate, keep rest of params
            page: this.state.api.page + 1
          })}>Next</button>
          {allTrips.filter(trip => this.shouldDisplayTrip(trip)) // need to change allTrips to unique trips in currentPage or faves
                   .map(trip => {
                     console.log('trying to render trip', trip.id)
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
          )})}
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
