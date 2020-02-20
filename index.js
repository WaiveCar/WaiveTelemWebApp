const AWS = require('aws-sdk');
const express = require('express');
const hbs = require('express-hbs');

const app = express();
const port = 2080;
app.engine(
  'hbs',
  hbs.express4({
    partialsDir: __dirname + '/views',
  }),
);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const actions = {
  unlock1: {desired: {can: 'unlock_1'}},
  unlockAll: {desired: {can: 'unlock_all'}},
  lock: {desired: {can: 'lock'}},
  flashLights: {desired: {can: 'flash_lights'}},
};

const thingName = '0123B5829E389548EE';

AWS.config.credentials = new AWS.Credentials(
  'AKIASTZMBSC75MBRXBWF',
  'pM3e2ygob74qo3ZLahk2S+D+7jmyf3naHrB06A5n',
);

AWS.config.region = 'us-east-2';

const iotdata = new AWS.IotData({
  endpoint: 'a2ink9r2yi1ntl-ats.iot.us-east-2.amazonaws.com',
});

const functions = {
  getShadow: (req, res) => {
    iotdata.getThingShadow({thingName}, (err, data) => {
      if (err) {
        res.send(err.stack);
      } else {
        res.send(data);
      }
    });
  },
  updateShadow: (req, res) => {
    iotdata.updateThingShadow(
      {
        thingName: '0123B5829E389548EE',
        payload: `{"state": ${JSON.stringify(actions[req.params.action])}}`,
      },
      (err, data) => {
        if (err) {
          res.send(err.stack);
        } else {
          res.send(data);
        }
      },
    );
  },
};

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Telematics Actions',
    actions: actions,
  });
});

app.get('/shadow', functions.getShadow);
app.post('/shadow/:action', functions.updateShadow);

app.listen(port, () => console.log(`App listening on ${port}`));
