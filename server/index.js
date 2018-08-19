const express = require('express');
const path = require('path')

const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');

app.use(express.static(__dirname + '/../client/build'));

// app.get('/api/users/:userId/trips', (req, res) => {
//   const userId = req.params.userId;
//   res.send('hello world');
// });

// app.get('/api/users/:userId/lines', (req, res) => {
//   const userId = req.params.userId;
//   res.send('hello world');
// });

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '/../client/build/index.html'));
// })

app.listen(port, () => console.log(`Listening on port ${port}`));