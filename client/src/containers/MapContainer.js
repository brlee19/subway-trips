import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import ArrivalInfo from '../components/ArrivalInfo.js';
import MapPin from '../components/MapPin.js';
import { selectArrival, updateMap } from '../actions/mapActions.js';

const googleAPIKey = process.env.GOOGLE_API_KEY || require('../config.js').googleAPIKey;

class MapContainer extends Component {
  render() {
    const { arrivals, googleMap, updateMap } = this.props;

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <ArrivalInfo arrival={ googleMap.arrivals.selectedArrival }/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleAPIKey }}
          center={googleMap.center}
          defaultZoom={googleMap.zoom}
          onChange={({center, zoom}) => updateMap(center, zoom)}
        >
        {arrivals.map(arrival => (
          <MapPin lat={arrival.attributes.latitude}
                  lng={arrival.attributes.longitude}
                  arrival={arrival}
                  key={arrival.id}
                  handleClick={this.props.selectArrival}
          />
        ))}
        </GoogleMapReact>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    arrivals: state.trips.arrivals,
    googleMap: state.googleMap
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectArrival: (arrival) => dispatch(selectArrival(arrival)),
  updateMap: (center, zoom) => dispatch(updateMap(center, zoom))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);