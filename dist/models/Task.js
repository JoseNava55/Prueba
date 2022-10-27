"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var taskSchema = new _mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    require: true
  },
  done: {
    type: Boolean,
    "default": false
  },
  user: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Task", taskSchema);

exports["default"] = _default;