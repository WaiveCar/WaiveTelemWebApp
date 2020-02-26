const {AWS, iot, iotData} = require('../awsConfig');
const actions = require('../telemActions');

module.exports = {
  index: (req, res, next) => {
    iot.listThings({}, (err, data) => {
      if (err) {
        return next(err);
      }
      const {things} = data;
      res.send(
        things.map(thing => {
          thing.type = 'homeGrown';
          return thing;
        }),
      );
    });
  },

  manage: (req, res, next) => {
    iot.listThings({}, (err, data) => {
      if (err) {
        return next(err);
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

  show: (req, res, next) => {
    iotData.getThingShadow({thingName: req.params.thingName}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.send(JSON.parse(data.payload));
      }
    });
  },

  update: (req, res, next) => {
    iotData.updateThingShadow(
      {
        thingName: req.params.thingName,
        payload: `{"state": ${JSON.stringify(actions[req.params.action])}}`,
      },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          res.send(data);
        }
      },
    );
  },
};
