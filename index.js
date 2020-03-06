require('dotenv').config();
const {AWS} = require('./awsConfig');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-hbs');
const shadowsRouter = require('./routers/shadowsRouter');
const SimpleNodeLogger = require('simple-node-logger');

const app = express();
const port = process.env.PORT || 2080;

const opts = {
  logDirectory: './logs',
  fileNamePattern: 'waive-telem-<DATE>.log',
  dateFormat: 'YYYY-MM-DD',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};
// The line below creates a rolling log in the /logs file
const logWrite = require('simple-node-logger').createRollingFileLogger(opts);
// The line below adds logging to the console
const log = require('simple-node-logger').createSimpleLogger();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

// This sets the view engine for handlebars templates
app.engine(
  'hbs',
  hbs.express4({
    partialsDir: __dirname + '/views',
  }),
);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// This middleware logs all requests
app.use((req, res, next) => {
  let message = `${req.method}: ${req.url}`;
  logWrite.info(message);
  log.info(message);
  next();
});

// This sets the router for '/shadows' requests
app.use('/shadows', shadowsRouter);

// This middleware handles errors for all routes
app.use((err, req, res, next) => {
  let message = `${req.method}: ${req.url}`;
  logWrite.warn(message);
  log.warn(message);
  res.status(err.statusCode).json({message: err.message, code: err.code});
});

app.listen(port, () => console.log(`App listening on ${port}`));
