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
    return (
      <div className="map-pin">
        <img src="/public-transport-subway.png" alt="Subway Icon" onClick={() => this.props.handleClick(this.props.arrival)}></img>
      </div>
    )
  }
}




export default MapPin;