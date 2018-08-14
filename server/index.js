const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../client/build'));

app.get('/api/hello', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => console.log(`Listening on port ${port}`));