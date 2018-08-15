import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { googleAPIKey } from '../config.js';

import ArrivalInfo from './ArrivalInfo.js';
import MapPin from './MapPin.js';

class GoogleMap extends Component {
  // rewrite to functional if no need for state
  constructor(props) {
    super(props);
    this.state = {
      selectedArrival: ''
    }
    this.selectArrival = this.selectArrival.bind(this);
  }

  selectArrival(arrivalId) {
    if (arrivalId === this.state.selectedArrival) return;
    this.setState({
      selectedArrival: arrivalId
    });
  }

  render() {
    const { arrivals } = this.props;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <ArrivalInfo arrival={arrivals.filter(arrival => arrival.id === this.state.selectedArrival)[0]}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleAPIKey }}
          center={this.props.center}
          defaultZoom={11}
        >
        {arrivals.map(arrival => (
          <MapPin lat={arrival.attributes.latitude}
                  lng={arrival.attributes.longitude}
                  arrival={arrival}
                  key={arrival.id}
                  handleClick={this.selectArrival}
          />
        ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;