const {AWS, iot, iotData} = require('../awsConfig');
const actions = require('../telemActions');

module.exports = {
  index: (req, res) => {
    iot.listThings({}, (err, data) => {
      if (err) {
        throw new Error(err.stack);
      }
      res.render('index', {
        title: 'Telematics Management',
        things: data.things,
        actions,
      });
    });
  },

  show: (req, res) => {
    iotData.getThingShadow({thingName: req.params.thingName}, (err, data) => {
      if (err) {
        throw new error(err.stack);
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
          throw new error(err.stack);
        } else {
          res.send(data);
        }
      },
    );
  },
};
