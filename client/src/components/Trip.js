import React from 'react';

const Trip = (props) => {
  const { trip } = props
  return (
    <div>
      <div key={trip.id} onClick={() => props.selectTrip(trip.id)}>
        <img src={trip.attributes['route-image-url']} alt={trip.attributes.route}/>
        Origin-Departure: {trip.attributes['origin-departure']}<br/>
        Destination: {trip.attributes.destination}
      </div>
      <button onClick={() => {props.addLineToFavorites(trip)}}>Add Line to Favorites</button>
      <button onClick={() => {props.addTripToFavorites(trip)}}>Add Trip to Favorites</button>
    </div>
  )
};

export default Trip;