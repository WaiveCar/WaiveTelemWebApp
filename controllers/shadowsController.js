const AWS = require('aws-sdk');
AWS.config.credentials = new AWS.Credentials(
  'AKIASTZMBSC75MBRXBWF',
  'pM3e2ygob74qo3ZLahk2S+D+7jmyf3naHrB06A5n',
);
AWS.config.region = 'us-east-2';

const actions = require('../telemActions.js');

const iotdata = new AWS.IotData({
  endpoint: 'a2ink9r2yi1ntl-ats.iot.us-east-2.amazonaws.com',
});

module.exports = {
  index: (req, res) => {
    res.send('Empty');
  },

  show: (req, res) => {
    iotdata.getThingShadow({thingName: req.params.thingName}, (err, data) => {
      if (err) {
        res.send(err.stack);
      } else {
        res.send(data);
      }
    });
  },

  update: (req, res) => {
    iotdata.updateThingShadow(
      {
        thingName: req.params.thingName,
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
