import React from 'react';

const lines = ['1', '2', '3', '4', '5', '6', '7', 'A', 'C', 'E', 'B', 'D', 'F', 'M',
'G', 'J', 'Z', 'L', 'N', 'Q', 'R', 'W', 'S'];

const LineFilter = (props) => (
  lines.map(line => <div key={line}>
      <img className="subway-icon"
           src={`/subwayicons/${line}.png`}
           onClick={() => props.handleClick(line)}
           style={{opacity: 0.4}}
      />
    </div>)
)

export default LineFilter;