const { join } = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
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

const states = ['Unknown', 'Do Not Disturb', 'Available', 'Not Home', 'Bring me cookies :)'];
const colors = ['#f8fb61', '#fb6161', '#9df951', '#fb6161', '#9df951'];
const dateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

let stateID;
let customMessage;
try {
  const stateObj = JSON.parse(fs.readFileSync('/data/state.json'));
  stateID = stateObj.stateID;
  customMessage = stateObj.customMessage;
  console.log('Restored state: ' + JSON.stringify(stateObj));
} catch {
  stateID = 0;
  customMessage = 'Bring me cookies :)';
  console.log('No previous state, setting to default');
}

app.get('/', function (req, res) {
  res.sendFile(join(__dirname, 'views', 'index.html'));
});

app.get('/state', (req, res) => {
  res.send(
    JSON.stringify({
      stateID: stateID,
      text: stateID === 4 ? customMessage : states[stateID],
      color: colors[stateID],
      timestamp: `${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }, dateFormat)} (Online)`,
    })
  );
});

app.post('/send-state', function (req, res) {
  stateID = req.body.newState;
  console.log('State changed to: ' + states[stateID]);
  fs.writeFileSync('/data/state.json', JSON.stringify({ stateID: stateID, customMessage: 'None' }));
  res.status(204).send('State changed to: ' + states[stateID]);
});

app.post('/send-custom', function (req, res) {
  stateID = 4;
  customMessage = req.body.customMessage;
  console.log('State changed to: ' + customMessage);
  fs.writeFileSync('/data/state.json', JSON.stringify({ stateID: stateID, customMessage: customMessage }));
  res.status(204).send('State changed to: ' + customMessage);
});

// start a server on port 80 and log its start to our console
app.listen(PORT, () => {
  console.log(`Config server listening on port ${PORT}`);
});
