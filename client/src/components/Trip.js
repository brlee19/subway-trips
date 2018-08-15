import React from 'react';

const Trip = (props) => {
  const { trip } = props
  return (
    <div key={trip.id} onClick={() => props.selectTrip(trip.id)}>
      <img src={trip.attributes['route-image-url']} alt={trip.attributes.route}/>
      Origin-Departure: {trip.attributes['origin-departure']}<br/>
      Destination: {trip.attributes.destination}
    </div>
  )
};

export default Trip;