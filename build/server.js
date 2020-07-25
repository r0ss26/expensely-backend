"use strict";

require("babel-polyfill");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _userRoutes = require("./routes/userRoutes");

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _categoriesRoutes = require("./routes/categoriesRoutes");

var _categoriesRoutes2 = _interopRequireDefault(_categoriesRoutes);

var _authRoutes = require("./routes/authRoutes");

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _budgetsRoutes = require("./routes/budgetsRoutes");

var _budgetsRoutes2 = _interopRequireDefault(_budgetsRoutes);

var _transactionRoutes = require("./routes/transactionRoutes");

var _transactionRoutes2 = _interopRequireDefault(_transactionRoutes);

var _categoriesData = require("./models/categoriesData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
var port = process.env.PORT || 5000;

_categoriesData.seedData;

app.use((0, _cors2.default)());
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true })); //Parse URL-encoded bodies
//app.use("/uploads", express.static('public'));

//connect to mongoDB
var db = process.env.DB_URL;
_mongoose2.default.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(function () {
  return console.log("mongoDB connected");
}).catch(function (err) {
  return console.log(err);
});

//use routes
app.use("/users", _userRoutes2.default);
app.use("/auth", _authRoutes2.default);
app.use("/categories", _categoriesRoutes2.default);
app.use("/budgets", _budgetsRoutes2.default);
app.use("/transactions", _transactionRoutes2.default);

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
//# sourceMappingURL=server.js.map