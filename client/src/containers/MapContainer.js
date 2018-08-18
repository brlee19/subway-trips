import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import { googleAPIKey } from '../config.js';

import MapPin from '../components/MapPin.js';

class MapContainer extends Component {
  render() {
    const { arrivals, googleMap } = this.props;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleAPIKey }}
          center={googleMap.center}
          defaultZoom={googleMap.zoom}
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

const mapStateToProps = (state) => {
  return {
    arrivals: state.trips.arrivals,
    googleMap: state.googleMap
  };
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps)(MapContainer);