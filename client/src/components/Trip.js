import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Trip = (props) => {
  const { trip, isFavorite, userId } = props;
  return (
    <Paper elevation={5}>

      <div className="trip-wrapper" key={trip.id}>

        <div className="line-picture"> 
          <img
            src={require(`../images/subway-icons/${trip.attributes.route}.png`)}
            alt={trip.attributes.route}
            height="64" width="64"
          />
        </div>

        <div className="trip-details">
            <p className="trip-detail-line">
              <strong>Departure From Origin:</strong> {trip.attributes['origin-departure']}
            </p>
            <p className="trip-detail-line">
              <strong>Destination:</strong> {trip.attributes.destination}
            </p>
            
            <Button
              variant="raised"
              color="primary"
              size="small"
              onClick={() => props.selectTrip(trip)}
            > See arrivals on map
            </Button>
        </div>

        <div className="favorite-buttons">
          <Button
              onClick={() => {
                props.toggleTripFromFavorites(isFavorite.trip, userId, trip)}
              }
              variant="raised"
              color="primary"
              size="small"
          >
           { isFavorite.trip ? '💛 Trip': '♡ Trip' }
          </Button>
        </div>
      </div>

    </Paper>
  )
};

export default Trip;