const AWS = require('aws-sdk');

AWS.config.credentials = new AWS.Credentials(
  process.env.aws_access_key_id,
  process.env.aws_secret_access_key,
);
AWS.config.region = process.env.region;

const iot = new AWS.Iot();

const iotData = new AWS.IotData({
  endpoint: process.env.endpoint,
});

module.exports = {AWS, iot, iotData};
