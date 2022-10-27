"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Task = _interopRequireDefault(require("../models/Task"));

var _tasks = require("../controllers/tasks.controller");

var _userController = require("../controllers/user.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();

var passport = require('passport');

router.get("/", _tasks.renderIndex);
router.get("/notes", isAuthenticated, _tasks.renderTasks);
router.post("/tasks/add", isAuthenticated, _tasks.createTask);
router.get("/about", _tasks.aboutTask);
router.get("/edit/:id", isAuthenticated, _tasks.renderTaskEdit);
router.post("/edit/:id", isAuthenticated, _tasks.editTask);
router.get("/delete/:id", isAuthenticated, _tasks.delteTask);
router.get("/taggdone/:id", _tasks.doneTask);
router.get("/signup", _userController.renderSignUpForm);
router.post("/signup", _userController.signup);
router.get("/signin", _userController.renderSigninForm);
router.post("/signin", _userController.signin);
router.get("/logout", _userController.logout);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash("error_msg", "Usted no esta autorizado.");
  res.redirect("/signin");
}

;
var _default = router;
exports["default"] = _default;