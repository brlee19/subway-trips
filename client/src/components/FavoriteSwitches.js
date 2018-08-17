import React, { Component } from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class FavoriteSwitches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: false,
      lines: false
    }
  }

  handleChange() {
    this.props.toggleTripVisibility();
  }

  render(){
    return (<FormGroup row className="filter-buttons">
    <FormControlLabel
      control={
        <Switch
          checked={this.props.checked}
          onChange={this.props.onChange}
          value="checkedA"
        />
      }
      label="Show favorite trips only"
    />
    {/* <FormControlLabel
      control={
        <Switch
          checked={this.state.switches.favoriteLines}
          onChange={this.props.toggleLineVisibility}
        />
      }
    label="Show favorite lines only"
    /> */}
  </FormGroup>)
  }
}

export default FavoriteSwitches;