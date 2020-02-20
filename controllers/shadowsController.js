const {AWS, iotData} = require('../awsConfig');
const actions = require('../telemActions');

module.exports = {
  index: (req, res) => {
    res.send('Empty');
  },

  show: (req, res) => {
    iotData.getThingShadow({thingName: req.params.thingName}, (err, data) => {
      if (err) {
        res.send(err.stack);
      } else {
        res.send(data);
      }
    });
  },

  update: (req, res) => {
    iotData.updateThingShadow(
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
