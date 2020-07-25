'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.SECRET;

module.exports = function (req, res, next) {

  //change token header for backend testing with postman
  // const token = req.header('x-auth-token');
  // console.log(token)
  // // Check if not token
  // if (!token) {
  //   return res.status(401).json({ msg: 'No token, Not authorized' });
  // }

  //token header for frontend
  var token = void 0;
  if (req.headers.authorization) {
    //   //get token from headers
    token = req.headers.authorization;
    //  // console.log(token)
  } else {
    //return error if no token
    return res.status(401).json({ msg: 'No token, Not authorized' });
  }

  try {
    var decoded = _jsonwebtoken2.default.verify(token, secret);

    //save the decoded user to req.body
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
//# sourceMappingURL=auth.js.map