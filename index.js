const AWS = require('aws-sdk');

AWS.config.credentials = new AWS.Credentials(
  'AKIASTZMBSC75MBRXBWF',
  'pM3e2ygob74qo3ZLahk2S+D+7jmyf3naHrB06A5n',
);

AWS.config.region = 'us-east-2';
const iotdata = new AWS.IotData({
  endpoint: 'a2ink9r2yi1ntl-ats.iot.us-east-2.amazonaws.com',
});
iotdata.getThingShadow({thingName: '0123B5829E389548EE'}, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
});

iotdata.updateThingShadow({
  thingName: '0123B5829E389548EE',
  payload: '{"state": {"desired":{"lock":"close"}}}',
}, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
});
