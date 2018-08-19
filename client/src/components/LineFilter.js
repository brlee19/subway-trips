import React from 'react';
import { connect } from 'react-redux';
import { addLineToFilter, removeLineFromFilter, addAllLinesToFilter, removeAllLinesFromFilter, fetchTrips } from '../actions/apiActions.js';
import { lines } from '../constants.js';

import Button from '@material-ui/core/Button';

const LineFilter = (props) => {
  const nextParamsRoutes = props.api.nextParams.routes;
  const { api, addLineToFilter, removeLineFromFilter, addAllLinesToFilter, removeAllLinesFromFilter, fetchTrips } = props;
  return (
  <div>
    <div className="line-filter">
      {lines.map(line => (
        <div key={line}>
          <img className="subway-icon"
            src={`/subwayicons/${line}.png`}
            onClick={() => {
              nextParamsRoutes.includes(line) ? removeLineFromFilter(line) : addLineToFilter(line)
              }}
            style={{opacity: nextParamsRoutes.includes(line) ? 1 : 0.4}}
          />
        </div>))}
    </div>
    
    <div className="line-filter-controls">
      <Button onClick={() => fetchTrips(api.nextParams)}
              variant="raised"
              color="primary"
              size="small"
      >Search using line filters</Button>

      <Button onClick={addAllLinesToFilter}
              variant="raised"
              color="primary"
              size="small"
      >Select all</Button>

      <Button onClick={removeAllLinesFromFilter}
              variant="raised"
              color="primary"
              size="small"
      >Reset filter</Button>

      <Button variant="raised"
              color="primary"
              size="small"
      >Save your favorite lines</Button>
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
  fetchTrips: (params) => dispatch(fetchTrips(params))
});


export default connect(mapStateToProps, mapDispatchToProps)(LineFilter);