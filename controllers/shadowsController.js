const {AWS, iot, iotData} = require('../awsConfig');
const actions = require('../telemActions');

module.exports = {
  // Fetches a list of all things attached to the AWS account used
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
    // Renders the front-end telematics management app
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
    // Fetches the sahdow for a single thing
    iotData.getThingShadow({thingName: req.params.thingName}, (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.send(JSON.parse(data.payload).state);
      }
    });
  },

  update: (req, res, next) => {
    // Sends an update to a Thing Shadow and returns the updated shadow
    iotData.updateThingShadow(
      {
        thingName: req.params.thingName,
        payload: `{"state": ${JSON.stringify(actions[req.params.action])}}`,
      },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          iotData.getThingShadow(
            {thingName: req.params.thingName},
            (err, data) => {
              if (err) {
                return next(err);
              } else {
                res.send(JSON.parse(data.payload).state);
              }
            },
          );
        }
      },
    );
  },
};
