import React from 'react';
import { connect } from 'react-redux';
import { addLineToFilter, removeLineFromFilter, addAllLinesToFilter, removeAllLinesFromFilter } from '../actions/apiActions.js';
import { lines } from '../constants.js';

const LineFilter = (props) => {
  const nextParamsRoutes = props.api.nextParams.routes;
  const { addLineToFilter, removeLineFromFilter, addAllLinesToFilter, removeAllLinesFromFilter } = props;
  return ( <div className="line-filter">
    {lines.map(line => <div key={line}>
        <img className="subway-icon"
            src={`/subwayicons/${line}.png`}
            onClick={() => {
              nextParamsRoutes.includes(line) ? removeLineFromFilter(line) : addLineToFilter(line)
              }}
            style={{opacity: nextParamsRoutes.includes(line) ? 1 : 0.4}}
        />
      </div>)}
    <button onClick={addAllLinesToFilter}>Select all</button>
    <button onClick={removeAllLinesFromFilter}>Reset filter</button>
    <button>Save favorite lines</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    api: state.api
  };
};

const mapDispatchToProps = (dispatch) => ({
  addLineToFilter: (line) => dispatch(addLineToFilter(line)),
  removeLineFromFilter: (line) => dispatch(removeLineFromFilter(line)),
  addAllLinesToFilter: () => dispatch(addAllLinesToFilter()),
  removeAllLinesFromFilter: () => dispatch(removeAllLinesFromFilter())
});


export default connect(mapStateToProps, mapDispatchToProps)(LineFilter);