"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./databse");

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].listen(_config.PORT);

console.log("SERVIDOR EN PUERTO", _config.PORT);