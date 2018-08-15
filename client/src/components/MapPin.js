import React, { Component } from 'react';

class MapPin extends Component {
  // turn into functional component
  constructor(props) {
    super(props)
    this.state = {
      visibility: 'icon'
    }
  }

  render() {
    console.log('rendering map pin!')
    return (
      <div className="map-pin">
        <img src="/public-transport-subway.png" onClick={() => this.props.handleClick(this.props.arrival.id)}></img>
      </div>
    )
  }
}




export default MapPin;