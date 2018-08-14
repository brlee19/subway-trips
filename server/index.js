const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');
const url = 'https://nooklyn-interview.herokuapp.com/'

// app.use(express.static(__dirname + '/../client/build'));

app.get('/api/hello', (req, res) => {
  res.send('hello world');
});

// get all trips
  // including get the next page of trips
  // if pages are not sorted in any particular way, need to get ALL pages
  // after getting the first page, can ask for all pages in between first and last in parallel by parsing page numbers
// get arrivals for a specific trip
// database to save favorites
app.get('/api/trips', async(req, res) => {
  try {
    const {data} = await axios.get(url + '/trips');
    res.send(data);
  } catch (e) {
    console.error('error is', e);
    res.status(500).send('Error trying to access external API');
  };
});

app.get('/api/trips/:tripId/arrivals', async(req, res) => {
  const tripId = req.params.tripId;
  try {
    const {data} = await axios.get(url + `/trips/${tripId}/arrivals`);
    res.send(data);
  } catch (e) {
    console.error('error is', e);
    res.status(500).send('Error trying to access external API');
  }
});

app.get('/api/six', async (req, res) => {
  // get all trips for the 6 train
  const results = await axios.get(url + '/trips', {
    params: {
      'filter[route]': 6
    }
  });
  try {
    const trips = results.data.data;
    trips.sort((a, b) => {
      return new Date(a.attributes['origin-departure']) - new Date(b.attributes['origin-departure'])
    });
    console.log('results are', JSON.stringify(trips))
    res.send('ok')
  } catch(e) {
    console.log('error is', e)
    res.send('error')
  }
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));