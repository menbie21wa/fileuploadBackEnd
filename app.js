/**
 * Load Module Dependencies
 *
 */

var express = require('express');
var cors = require('cors');
var debug = require('debug')('api-user');
const { sequelize } = require('./models');
//const eplusApp_INIT   = require('./lib/eplusapp_INIT');

const router = require('./routes');
var app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Content-Type, access-control-allow-origin, x-api-applicationid, authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, PUT, PATCH, POST, DELETE'
  );
  next();
});

// Parser JSON body Requests
app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ limit: '3mb', extended: true }));

sequelize
  .sync()
  .then(() => {
    console.log(`DB connected sucessfully.`);
  })
  .catch((err) => console.log(`Error has occured in database connection`));

router(app);

app.use((err, req, res, next) => {
  res.json({ message: err.message });
});

// Listen on Port
const server = app.listen(11215, () => {
  debug(
    `API server running on port ${server.address().port} in ${app.get(
      'env'
    )} mode`
  );

  debug(
    `Hi there! I'm listening on port ${server.address().port} in ${app.get(
      'env'
    )} mode.`
  );
});
setTimeout(() => {
  try {
    // eplusApp_INIT();
  } catch (err) {
    console.log(err);
  }
}, 3000);

module.exports = app;
