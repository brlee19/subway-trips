import React from 'react';

const Trip = ({trip}) => (
  <div key={trip.id}>
    <img src={trip.attributes['route-image-url']} alt={trip.attributes.route}/>
    Origin-Departure: {trip.attributes['origin-departure']}<br/>
    Destination: {trip.attributes.destination}
  </div>
);

export default Trip;