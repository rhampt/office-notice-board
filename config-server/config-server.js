const { join } = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const app = express();
const PORT = 80;

app.set('views', join(__dirname, 'views', 'public'));
app.set('view engine', 'html');

// Enable the public directory for resource files
app.use('/public', express.static(join(__dirname, 'views', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(join(__dirname, 'views', 'public', 'favicon.ico')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

let stateID = 0;
let states = ['state 0', 'state 1', 'state 2', 'state 3'];

// reply to request with the hello world html file
app.get('/', function (req, res) {
  res.sendFile(join(__dirname, 'views', 'index.html'));
});

app.get('/state', (req, res) => {
  res.send(JSON.stringify({ stateID: stateID, text: states[stateID] }));
});

app.post('/send', function (req, res) {
  stateID = req.body.newState;
  console.log('newState: ' + states[stateID]);
  res.send('State changed to ' + states[stateID]);
});

// start a server on port 80 and log its start to our console
app.listen(PORT, () => {
  console.log(`Config server listening on port ${PORT}`);
});
