const express = require('express');
const path = require('path')

const app = express();
const port = process.env.PORT || 8080;
const { getFavoriteTrips, saveFavoriteTrip } = require('./database/index.js');

app.use(express.static(__dirname + '/../client/build'));

app.get('/api/users/:userId/favorite-trips', async (req, res) => {
  const { userId } = req.params;
  try {
    res.send(await getFavoriteTrips(userId));
  } catch(e) {
    res.status(500).send('Unable to get favorite trips!');
  };
});

app.get('/api/favorite-trips-test', async (req, res) => {
  // const { trip, userId } = req.body;
  const testTrip = {
    id: '1098',
    type: 'trips',
    links: {
      self: 'https://nooklyn-interview.herokuapp.com/trips/1098'
    },
    attributes: {
      route: 'D',
      'origin-departure': 'Feb 08 12:04 AM',
      destination: 'Bedford Park Blvd',
      'route-image-url': 'https://nooklyn-interview.herokuapp.com/subway/D.png'
    },
    relationships: {
      arrivals: {
        links: {
          self: 'https://nooklyn-interview.herokuapp.com/trips/1098/relationships/arrivals',
          related: 'https://nooklyn-interview.herokuapp.com/trips/1098/arrivals'
        }
      }
    }
  };
  try {
    res.send(await saveFavoriteTrip('1', testTrip));
  } catch(e) {
    res.status(500).send('Unable to save favorite trips!');
  };
});

app.delete('/api/users/:userId/trips/:tripId', async (req, res) => {
  const { userId, tripId } = req.params;
  try {
    res.send(await getFavoriteTrips(userId));
  } catch(e) {
    res.status(500).send('Unable to get favorite trips!')
  };
});

// app.get('/api/users/:userId/lines', (req, res) => {
//   const userId = req.params.userId;
//   res.send('hello world');
// });

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '/../client/build/index.html'));
// })

app.listen(port, () => console.log(`Listening on port ${port}`));