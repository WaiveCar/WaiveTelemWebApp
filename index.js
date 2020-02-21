require('dotenv').config();
const {AWS} = require('./awsConfig');
const express = require('express');
const hbs = require('express-hbs');
const shadowsRouter = require('./routers/shadowsRouter');

const app = express();
const port = 2080;

app.engine(
  'hbs',
  hbs.express4({
    partialsDir: __dirname + '/views',
  }),
);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/shadows', shadowsRouter);
app.listen(port, () => console.log(`App listening on ${port}`));
