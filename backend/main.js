import express from 'express';
const port = 8800;

const app = express();

app.get('/', (req, res) => {
  res.send('Server was reached on root route.');
});

app.get('/new/', (req, res) => {
  res.send('New route was reached.');
});

app.listen(port, () => console.log('Server listening on port: ' + port));
