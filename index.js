const {AWS, iot} = require('./awsConfig');
const express = require('express');
const hbs = require('express-hbs');
const shadowsRouter = require('./routers/shadowsRouter.js');

const app = express();
const port = 2080;
const actions = require('./telemActions');

app.engine(
  'hbs',
  hbs.express4({
    partialsDir: __dirname + '/views',
  }),
);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  iot.listThings({}, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log('data', data);
    }
    res.render('index', {
      title: 'Telematics Management',
      things: data.things,
      actions,
    });
  });
});

app.use('/shadows', shadowsRouter);
app.listen(port, () => console.log(`App listening on ${port}`));
