import { connect } from 'react-redux';
import { fetchTrips } from '../actions/apiActions';
import React from 'react';

const ReduxTestComponent = (props) => {
  return (
    <div>
      Redux Test Component
      <button onClick={props.fetchTrips}> TEST </button>
    </div>
  )
};

const mapStateToProps = (state) => ({
  api: state.api,
  trips: state.trips
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: () => dispatch(fetchTrips({page: 1, route: '6', sort: null}))
});



export default connect(mapStateToProps, mapDispatchToProps)(ReduxTestComponent);