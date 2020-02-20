const AWS = require('aws-sdk');
const express = require('express');

const app = express();
const port = 2080;

const actions = {
  unlock1: '{"desired":{"can":"unlock_1"}}',
  unlockAll: '{"desired":{"can":"unlock_all"}}',
  lock: '{"desired":{"can":"lock"}}',
  flashLights: '{"desired":{"can":"flash_lights"}}',
};

AWS.config.credentials = new AWS.Credentials(
  'AKIASTZMBSC75MBRXBWF',
  'pM3e2ygob74qo3ZLahk2S+D+7jmyf3naHrB06A5n',
);

AWS.config.region = 'us-east-2';

const iotdata = new AWS.IotData({
  endpoint: 'a2ink9r2yi1ntl-ats.iot.us-east-2.amazonaws.com',
});

/*
 */

const actions = {
  getShadow: (req, res) => {
    iotdata.getThingShadow({thingName: '0123B5829E389548EE'}, (err, data) => {
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
        payload: '{"state": {"desired":{"lock":"close"}}}',
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
  res.send('hello');
});

app.listen(port, () => console.log(`App listening on ${port}`));
