'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = undefined;

var _expressValidator = require('express-validator');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validate = exports.validate = function validate(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);
  if (errors.isEmpty()) {
    return next();
  }
  var extractedErrors = [];
  errors.array().map(function (err) {
    return extractedErrors.push(_defineProperty({}, err.param, err.msg));
  });

  return res.status(422).json({
    errors: extractedErrors
  });
};
//# sourceMappingURL=validate.js.map