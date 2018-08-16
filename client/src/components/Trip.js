import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const Trip = (props) => {
  const { trip } = props
  return (
    <Paper elevation="5">
      <div className="trip-wrapper" key={trip.id} onClick={() => props.selectTrip(trip.id)}>
        <div className="line-picture"> 
          <img
            src={trip.attributes['route-image-url']}
            alt={trip.attributes.route}
            height="64" width="64"
          />
        </div>

        <div className="trip-info">
          <strong>Departure From Origin</strong>: {trip.attributes['origin-departure']}<br/>
          <strong>Destination</strong>: {trip.attributes.destination}
        </div>

        <div className="favorite-buttons">
          <Button
            onClick={() => {props.toggleLineFromFavorites(trip)}}
            variant="raised"
            color="primary"
            size="small"
          >
          ♡ Line 💛
          </Button>
          <Button
              onClick={() => {props.toggleTripFromFavorites(trip)}}
              variant="raised"
              color="primary"
              size="small"
          >
           ♡ Trip
          </Button>
        </div>
      </div>

    </Paper>
  )
};

export default Trip;