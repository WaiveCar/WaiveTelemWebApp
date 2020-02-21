const {AWS, iot, iotData} = require('../awsConfig');
const actions = require('../telemActions');

module.exports = {
  index: (req, res) => {
    iot.listThings({}, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      const {things} = data;
      res.render('index', {
        title: 'Telematics Management',
        things: things,
        selected: things[0].thingName,
        whose: things[0].attributes.Whose,
        actions,
      });
    });
  },

  show: (req, res) => {
    iotData.getThingShadow({thingName: req.params.thingName}, (err, data) => {
      if (err) {
        return res.status(500).send(err);
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
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      },
    );
  },
};
