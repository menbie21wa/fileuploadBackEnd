var express = require('express');
var cors = require('cors');
var debug = require('debug')('api-user');
const { sequelize } = require('./models');
const path = require('path');
const router = require('./routes');
var app = express();

const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
});

// Apply rate limiter to all requests
app.use(limiter);
// Compress all routes
app.use(compression()); 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

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
//app.use('/images', express.static('images'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use('/audios', express.static(path.join(__dirname, 'audios')));

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
const server = app.listen(11221, () => {
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