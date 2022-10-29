const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const routers = require("./routes");
const app = express();

// parse application/json
app.use(bodyParser.json());

// APIs logger
app.use(logger("dev"));

// cookieParser error
app.use(cookieParser());

// cors error
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

// sync pg tables
db.sequelize
  .sync()
  .then(() => {
    console.log("Successfully Synced...");
  })
  .catch((err) => {
    console.log("Failed to Synced..." + err);
  });

// swagger APIs docs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load(__dirname + "/api-docs.yml"))
);

// all routers
app.use("/api/v1", routers.adminAuth);
app.use("/api/v1", routers.roleAuthCtrl);
app.use("/api/v1", routers.roleMgmt);

module.exports = app;
