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

app.get('/api/tripz/all', async(req, res) => {
  // console.log('i am running')
  // const pageNumbers = [];
  // for (let i = 1; i < 51; i++) {
  //   pageNumbers.push(i);
  // }
  // try {
  //   const queries = pageNumbers.map(i => axios.get(url + `/trips/?pagenumber=${i}`));
  //   results = await Promise.all(queries);
  //   console.log('results are', results.map(result => result.data.data));
  //   console.log('number of results are', results.length)
  // } catch(e) {
  //   console.log('error is', e)
  // }

  const query1 = axios.get("https://nooklyn-interview.herokuapp.com/trips?page%5Bnumber%5D=1&page%5Bsize%5D=20")
  const query2 = axios.get("https://nooklyn-interview.herokuapp.com/trips?page%5Bnumber%5D=2&page%5Bsize%5D=20")
  const query3 = axios.get("https://nooklyn-interview.herokuapp.com/trips?page%5Bnumber%5D=3&page%5Bsize%5D=20")
  const query4 = axios.get("https://nooklyn-interview.herokuapp.com/trips?page%5Bnumber%5D=4&page%5Bsize%5D=20")
  const query5 = axios.get("https://nooklyn-interview.herokuapp.com/trips?page%5Bnumber%5D=5&page%5Bsize%5D=20")
  const query6 = axios.get("https://nooklyn-interview.herokuapp.com/trips?page%5Bnumber%5D=6&page%5Bsize%5D=20")

  const results = await Promise.all([query1, query2, query3, query4, query5, query6]);
  console.log(results.map(result => result.data.data.map(data => data.id)))

  res.send('ok')
})

app.get('/api/six', async (req, res) => {
  // TEST get all trips for the 6 train
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