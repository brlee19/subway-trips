import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { googleAPIKey } from '../config.js';

class GoogleMap extends Component {

  render() {
    const center = {
      lat: 40.7128,
      lng: -74.0060
    };

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleAPIKey }}
          defaultCenter={center}
          defaultZoom={12}
        />
      </div>
    );
  }
}

export default GoogleMap;