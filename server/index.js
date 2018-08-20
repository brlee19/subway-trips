const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const { getFavoriteTrips, saveFavoriteTrip } = require('./database/index.js');

app.use(express.static(__dirname + '/../client/build'));
app.use(bodyParser.json())

app.get('/api/users/:userId/favorite-trips', async (req, res) => {
  const { userId } = req.params;
  try {
    res.send(await getFavoriteTrips(userId));
  } catch(e) {
    res.status(500).send('Unable to get favorite trips!');
  };
});

app.post('/api/favorite-trips', async (req, res) => {
  const { trip, userId } = req.body.params;
  try {
    await saveFavoriteTrip(userId, trip);
    res.send('Favorite trip succesfully saved!') // only send if actually successful
  } catch(e) {
    res.status(500).send('Unable to save favorite trip!');
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

app.listen(port, () => console.log(`Listening on port ${port}`));