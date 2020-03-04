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
  logFilePath: './mylogfile.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};
const log = SimpleNodeLogger.createSimpleLogger(opts);

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
  log.info(`${req.method}: ${req.url}`);
  next();
});

app.use('/shadows', shadowsRouter);

app.use((err, req, res, next) => {
  log.warn(`${err.statusCode}: ${err.message}`);
  res.status(err.statusCode).json({message: err.message, code: err.code});
});

app.listen(port, () => console.log(`App listening on ${port}`));
