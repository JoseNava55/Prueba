"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  nombre: {
    type: String
  },
  telefono: {
    type: String
  }
});

userSchema.methods.encryptPassword = function (password) {
  return _bcryptNodejs["default"].hashSync(password, _bcryptNodejs["default"].genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return _bcryptNodejs["default"].compareSync(password, this.password);
};

module.exports = _mongoose["default"].model('user', userSchema);