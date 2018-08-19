import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const NavButtons = ({ source, fetchPage, visibility }) => {
  if (visibility.trips === 'favorites') return null;
  else if (visibility.trips === 'currentPage') return (
  <Paper>
    <Button 
      variant="raised"
      size="small"
      disabled={source.pages.current === source.pages.first}
      onClick={() => {fetchPage(source.pages.first, source)}}>
      First
    </Button>
    <Button 
      variant="raised"
      size="small"
      disabled={source.pages.current === source.pages.first}
      onClick={() => {fetchPage(source.pages.current - 1, source)}}>
      Prev
    </Button>
    <Button
      variant="raised"
      size="small"
      disabled={source.pages.current === source.pages.last}
      onClick={() => {fetchPage(source.pages.current + 1, source)}}>
      Next
    </Button>
    <Button
      variant="raised"
      size="small"
      disabled={source.pages.current === source.pages.last}
      onClick={() => {fetchPage(source.pages.last, source)}}>
      Last
    </Button>
    <div>
      Page {source.pages.current} of {source.pages.last}
    </div>
  </Paper>);
  else return <div> Something went wrong! </div>
};

export default NavButtons;