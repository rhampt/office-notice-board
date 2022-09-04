const express = require('express');
const app = express();
const port = 84;

app.get('/', (req, res) => {
  res.send('Hello World, from the API');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
