import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { googleAPIKey } from '../config.js';

import MapPin from './MapPin.js';

class GoogleMap extends Component {
  // rewrite to functional if no need for state
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12
    }
    
  }

  render() {
    console.log('center is now', this.props.center);
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleAPIKey }}
          center={this.props.center}
          defaultZoom={this.state.zoom}
        >
        {this.props.arrivals.map(arrival => (
          <MapPin lat={arrival.attributes.latitude}
                  lng={arrival.attributes.longitude} 
                  arrival={arrival}
                  key={arrival.id}
          />
        ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;