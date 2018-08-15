import React, { Component } from 'react';

class MapPin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visibility: 'icon'
    }
    this.toggleComponent = this.toggleComponent.bind(this);
  }

  toggleComponent() {
    console.log('about to toggle component')
    this.setState({
      visibility: this.state.visibility === 'icon' ? 'info' : 'icon'
    }, console.log(`map pin visibility is now ${this.state.visibility}`))
  }

  render() {
    return (<div className="map-pin" onClick={this.toggleComponent}>
        {this.state.visibility === 'icon' ? (<SubwayIcon />) : (<InfoBox arrival={this.props.arrival}/>)}
      </div>
    )
  }
}

const SubwayIcon = () => (
  <img src="/public-transport-subway.png"></img>
);

const InfoBox = ({arrival}) => (
  <div>
    {arrival.attributes['station-name']}
    {arrival.attributes.time}
  </div>
)

export default MapPin;