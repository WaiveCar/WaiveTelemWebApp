const AWS = require('aws-sdk');

AWS.config.credentials = new AWS.Credentials(
  'AKIASTZMBSC75MBRXBWF',
  'pM3e2ygob74qo3ZLahk2S+D+7jmyf3naHrB06A5n',
);
AWS.config.region = 'us-east-2';

const iotData = new AWS.IotData({
  endpoint: 'a2ink9r2yi1ntl-ats.iot.us-east-2.amazonaws.com',
});

module.exports = {AWS, iotData};
