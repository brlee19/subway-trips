const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const { getFavoriteTrips, saveFavoriteTrip, deleteFavoriteTrip } = require('./database/index.js');

app.use(express.static(__dirname + '/../client/build'));
app.use(bodyParser.json())

app.get('/api/users/:userId/favorite-trips', async (req, res) => {
  try {
    const { userId } = req.params;
    res.send(await getFavoriteTrips(userId));
  } catch(e) {
    console.log('error getting favorite trips', e);
    res.status(500).send('Unable to get favorite trips!');
  };
});

app.post('/api/favorite-trips', async (req, res) => {
  try {
    const { userId, trip } = req.body;
    await saveFavoriteTrip(userId, trip);
    res.send('Favorite trip successfully saved!');
  } catch(e) {
    console.log('error saving favorite trip', e);
    res.status(500).send('Unable to save favorite trip!');
  };
});

app.delete('/api/favorite-trips', async (req, res) => {
  try {
    const { userId, tripId } = req.body;
    await deleteFavoriteTrip(userId, tripId);
    res.send('Favorite trip successfully deleted!');
  } catch(e) {
    console.log('error deleting fave trip', e);
    res.status(500).send('Unable to delete favorite trip!')
  };
});

// app.get('/api/users/:userId/lines', (req, res) => {
//   const userId = req.params.userId;
//   res.send('hello world');
// });

app.listen(port, () => console.log(`Listening on port ${port}`));