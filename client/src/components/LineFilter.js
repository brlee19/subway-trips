import React from 'react';
import { connect } from 'react-redux';
import FavoriteSwitch from './FavoriteSwitch.js';
import { addLineToFilter, removeLineFromFilter, addAllLinesToFilter,
          removeAllLinesFromFilter, fetchTrips, saveFavoriteLines } from '../actions/apiActions.js';
import { lines } from '../constants.js';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const style = {
  padding: '10px',
  margin: '5px'
};

const LineFilter = (props) => {
  const nextParamsRoutes = props.api.nextParams.routes;
  const { api, addLineToFilter, removeLineFromFilter, addAllLinesToFilter,
          removeAllLinesFromFilter, fetchTrips, saveFavoriteLines } = props;
  return (
  <div>
    <div className="line-filter">
      {lines.map(line => (
        <div key={line}>
          <img className="subway-icon"
            src={require(`../images/subway-icons/${line}.png`)}
            alt={line}
            onClick={() => {
              nextParamsRoutes.includes(line) ? removeLineFromFilter(line) : addLineToFilter(line)
              }}
            style={{opacity: nextParamsRoutes.includes(line) ? 1 : 0.4}}
          />
        </div>))}
    </div>
    
    <div className="line-filter-controls">
      <Button onClick={addAllLinesToFilter}
              variant="raised"
              color="primary"
              size="small"
              style={style}
      >Select all lines</Button>

      <Button onClick={removeAllLinesFromFilter}
              variant="raised"
              color="primary"
              size="small"
              style={style}
      >Clear all lines</Button>

      <Button onClick={() => fetchTrips(api.nextParams)}
              variant="raised"
              color="primary"
              size="small"
              className="filter-button"
              style={style}
      >Search using selected lines</Button>

      <Button variant="raised"
              color="primary"
              size="small"
              style={style}
              onClick={() => saveFavoriteLines(api.userId, nextParamsRoutes)}
      >Save selected lines as favorites</Button>
    </div>
  </div>
  )
};

const mapStateToProps = (state) => {
  return {
    api: state.api
  };
};

const mapDispatchToProps = (dispatch) => ({
  addLineToFilter: (line) => dispatch(addLineToFilter(line)),
  removeLineFromFilter: (line) => dispatch(removeLineFromFilter(line)),
  addAllLinesToFilter: () => dispatch(addAllLinesToFilter()),
  removeAllLinesFromFilter: () => dispatch(removeAllLinesFromFilter()),
  fetchTrips: (params) => dispatch(fetchTrips(params)),
  saveFavoriteLines: (userId, lines) => dispatch(saveFavoriteLines(userId, lines))
});


export default connect(mapStateToProps, mapDispatchToProps)(LineFilter);