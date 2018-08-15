import React from 'react';

const ArrivalInfo = ({ arrival }) => {
  if (!arrival) return (<div>
    Click on an arrival to see its information here.
    <br/>
  </div>);
  return (
    <div>
      Station: {arrival.attributes['station-name']}<br/>
      Arrival Time: {arrival.attributes.time}
    </div>
  );
};

export default ArrivalInfo;