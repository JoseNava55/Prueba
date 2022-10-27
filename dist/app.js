"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressHandlebars = _interopRequireWildcard(require("express-handlebars"));

var _index = _interopRequireDefault(require("./routes/index"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _morgan = _interopRequireDefault(require("morgan"));

var _passport = _interopRequireDefault(require("passport"));

require("./passport/local-auth");

var _connectFlash = _interopRequireDefault(require("connect-flash"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set("views", _path["default"].join(__dirname, "views"));
app.engine(".hbs", (0, _expressHandlebars.create)({
  layoutsDir: _path["default"].join(app.get("views"), "layouts"),
  partialsDir: _path["default"].join(app.get("views"), "partials"),
  defaulLayout: "main",
  extname: ".hbs"
}).engine);
app.set("view engine", ".hbs"); //Middleware

app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _expressSession["default"])({
  secret: 'miclave',
  resave: false,
  saveUninitialized: false
}));
app.use(_passport["default"].session());
app.use((0, _connectFlash["default"])());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
}); //Routes

app.use(_index["default"]);
var _default = app;
exports["default"] = _default;