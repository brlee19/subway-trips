import React, { Component } from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class FavoriteSwitch extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (<FormGroup row className="filter-buttons">
    <FormControlLabel
      control={
        <Switch
          checked={this.props.trips.checked}
          onChange={this.props.trips.onChange}
          value="checkedA"
        />
      }
      label="Show your favorite trips"
    />
  </FormGroup>)
  }
}

export default FavoriteSwitch;