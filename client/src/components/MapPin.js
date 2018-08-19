import React from 'react';

const MapPin = (props) => {
  return (
    <div className="map-pin">
      <img src="/public-transport-subway.png"
           alt="Subway Icon"
           onClick={() => props.handleClick(props.arrival)}>
      </img>
    </div>
  )
};

export default MapPin;