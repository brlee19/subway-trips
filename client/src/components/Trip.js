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
      <button onClick={() => {props.toggleLineFromFavorites(trip)}}>Toggle Line to/from Favorites</button>
      <button onClick={() => {props.toggleTripFromFavorites(trip)}}>Toggle Trip to/from Favorites</button>
    </div>
  )
};

export default Trip;