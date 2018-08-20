import React from 'react';
import Paper from '@material-ui/core/Paper';

const ArrivalInfo = ({ arrival }) => {
  if (!arrival) return (
    <Paper>
      Click on an arrival to see its information here. <br/>
    </Paper>
  );
  
  return (
    <Paper>
      Station: {arrival.attributes['station-name']}<br/>
      Arrival Time: {arrival.attributes.time}
    </Paper>
  );
};

export default ArrivalInfo;