const {AWS, iot, iotData} = require('../awsConfig');
const actions = require('../telemActions');

function getThingShadowPromise(thingName) {
  return new Promise((resolve, reject) => {
    iotData.getThingShadow({thingName}, (err, data) => {
      if (err) {
        // This is being done to handle the case of devices that don't have a shadow yet. they currently shouldn't be used for anything anyway
        return resolve({type: 'homegrown'});
      } else {
        data.type = 'homegrown';
        resolve(data);
      }
    });
  });
}

module.exports = {
  index: (req, res, next) => {
    iot.listThings({}, async (err, data) => {
      if (err) {
        res.status(500);
        return next(err.stack);
      }
      const {things} = data;
      let shadows = things.map(thing => getThingShadowPromise(thing.thingName));
      Promise.all(shadows)
        .then(result => {
          return res.send(result);
        })
        .catch(err => {
          res.status(500);
          next(err.stack);
        });
    });
  },

  manage: (req, res, next) => {
    iot.listThings({}, (err, data) => {
      if (err) {
        res.status(500);
        return next(err.stack);
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
        res.status(500);
        return next(err.stack);
      } else {
        res.send(data);
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
          res.status(500);
          return next(err.stack);
        } else {
          res.send(data);
        }
      },
    );
  },
};
