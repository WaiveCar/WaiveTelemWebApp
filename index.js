require('dotenv').config();
const {AWS} = require('./awsConfig');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-hbs');
const shadowsRouter = require('./routers/shadowsRouter');
const SimpleNodeLogger = require('simple-node-logger');

const app = express();
const port = 2080;

const opts = {
  logDirectory: './logs',
  fileNamePattern: 'waive-telem-<DATE>.log',
  dateFormat: 'YYYY-MM-DD',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const logWrite = require('simple-node-logger').createRollingFileLogger(opts);
const log = require('simple-node-logger').createSimpleLogger();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.engine(
  'hbs',
  hbs.express4({
    partialsDir: __dirname + '/views',
  }),
);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use((req, res, next) => {
  let message = `${req.method}: ${req.url}`;
  logWrite.info(message);
  log.info(message);
  next();
});

app.use('/shadows', shadowsRouter);

app.use((err, req, res, next) => {
  let message = `${req.method}: ${req.url}`;
  logWrite.warn(message);
  log.warn(message);
  res.status(err.statusCode).json({message: err.message, code: err.code});
});

app.listen(port, () => console.log(`App listening on ${port}`));
