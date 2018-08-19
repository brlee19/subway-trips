import React, { Component } from 'react';
import { connect } from 'react-redux';

import { displayCurrentPageTrips, displayFavoriteTrips } from '../actions/tripsActions';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class FavoriteSwitch extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const tripVisibility = this.props.trips.visibility.trips;
    const { displayCurrentPageTrips, displayFavoriteTrips } = this.props;

    return (
    <FormGroup row className="filter-buttons">
      <FormControlLabel
        control={
          <Switch
            checked={tripVisibility === 'favorites'}
            onChange={tripVisibility === 'favorites' ? displayCurrentPageTrips : displayFavoriteTrips}
          />
        }
        label="Show your favorite trips"
      />
    </FormGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips
  };
};

const mapDispatchToProps = (dispatch) => ({
  displayCurrentPageTrips: () => dispatch(displayCurrentPageTrips()),
  displayFavoriteTrips: () => dispatch(displayFavoriteTrips()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteSwitch);