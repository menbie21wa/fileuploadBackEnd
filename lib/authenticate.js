const Model = require('../models');
const jwt = require('jsonwebtoken');

const Authentication = (req, res, next) => {
  var authorization = req.get('Authorization');

  if (!authorization) {
    res.status(403);
    res.json({
      status: 403,
      type: 'AUTHENTICATION_ERROR',
      message: 'Use the Right Authentication',
    });
    return;
  }

  var authParts = authorization.split(' ');

  if (authParts[0] !== 'Bearer' || !authParts[1]) {
    res.status(403);
    res.json({
      message: 'Wrong Authentication Schema',
    });

    return;
  }

  jwt.verify(authParts[1], process.env.API_SECRETE, async (err, decode) => {
    // console.log("user", decode);
    if (err) {
      res.status(403);
      res.json({
        message: 'Wrong Authentication Credentials',
      });
      return;
    }
    let id = decode.id;

    let user = await Model.User.findByPk(id);

    if (!user || Object.keys(user).length === 0) {
      res.status(403);
      res.json({
        message: 'Wrong Authentication Credentials',
      });

      return;
    } else {
      req._user = user;
      next();
    }
  });
};

module.exports = Authentication;
