import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const NavButtons = ({ api, fetchPage }) => (
  <Paper>
    <Button 
      variant="raised"
      size="small"
      disabled={api.pages.current === api.pages.first}
      onClick={() => {fetchPage(api.pages.first, api)}}>
      First
    </Button>
    <Button 
      variant="raised"
      size="small"
      disabled={api.pages.current === api.pages.first}
      onClick={() => {fetchPage(api.pages.current - 1, api)}}>
      Prev
    </Button>
    <Button
      variant="raised"
      size="small"
      disabled={api.pages.current === api.pages.last}
      onClick={() => {fetchPage(api.pages.current + 1, api)}}>
      Next
    </Button>
    <Button
      variant="raised"
      size="small"
      disabled={api.pages.current === api.pages.last}
      onClick={() => {fetchPage(api.pages.last, api)}}>
      Last
    </Button>
    <div>
      Page {api.pages.current} of {api.pages.last}
    </div>
  </Paper>
);

export default NavButtons;