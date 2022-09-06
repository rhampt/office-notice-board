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
const states = ['Unknown', 'Here — Do not disturb', 'Here — available', 'Not here', 'Bring me cookies :)'];
const colors = ['#f8fb61', '#fb6161', '#9df951', '#fb6161', '#9df951'];
const dateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

// reply to request with the hello world html file
app.get('/', function (req, res) {
  res.sendFile(join(__dirname, 'views', 'index.html'));
});

app.get('/state', (req, res) => {
  res.send(
    JSON.stringify({
      stateID: stateID,
      text: states[stateID],
      color: colors[stateID],
      timestamp: `${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }, dateFormat)} (Online)`,
    })
  );
});

app.post('/send', function (req, res) {
  stateID = req.body.newState;
  console.log('State changed to: ' + states[stateID]);
  res.send('State changed to: ' + states[stateID]);
});

// start a server on port 80 and log its start to our console
app.listen(PORT, () => {
  console.log(`Config server listening on port ${PORT}`);
});
