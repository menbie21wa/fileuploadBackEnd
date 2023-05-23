/**
 * authorize a user
 *
 * @desc handles document access control depending
 * 			 on the role of a user
 *
 * @param {Object} roles User Role Object/Array
 * @param {String} action User Access Status
 */
const authorization = (roles) => {
  return function middleware(req, res, next) {
    if (!req._user) {
      res.status(401);
      res.json({
        message: 'Missing Authenticated User',
      });
      return;
    }

    var user = req._user;
    var roleFound = false;
    var isAuthorized = false;

    roles.forEach(function (role) {
      if (user.role === role) {
        roleFound = true;
      }
    });

    if (roleFound) isAuthorized = true;

    if (!isAuthorized) {
      res.status(401);
      res.json({
        message: 'Action Not Allowed',
      });
      return;
    } else {
      next();
    }
  };
};

module.exports = authorization;
