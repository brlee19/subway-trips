import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { googleAPIKey } from '../config.js';

import ArrivalInfo from '../components/ArrivalInfo.js';
import MapPin from '../components/MapPin.js';

import { selectArrival, updateMap } from '../actions/mapActions.js';

class MapContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     center: {
  //       lat: 40.85757283543077,
  //       lng: -74.03921173114793
  //     },
  //     zoom: 11
  //   }
  //   this._onChange = this._onChange.bind(this);
  //   this.changeCenter = this.changeCenter.bind(this);
  // }

  // _onChange({center, zoom}) {
  //   this.setState({
  //     center: center,
  //     zoom: zoom,      
  //   });
  // }

  // changeCenter(lat, lng) {
  //   this.setState({
  //     center: {
  //       lat,
  //       lng
  //     }
  //   });
  // }

  render() {
    const { arrivals, googleMap, updateMap } = this.props;
    console.log('map has re-rendered')

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
        <button onClick={
          () => updateMap({lat: 37.7824134, lng: -122.4088472}, 11)
        }>RECENTER MAP</button>
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
  selectArrival: (arrival) => dispatch(selectArrival(arrival)),
  updateMap: (center, zoom) => dispatch(updateMap(center, zoom))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);