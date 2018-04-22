import bluebird = require("bluebird");
import bodyParser = require("body-parser");
import compression = require("compression");
import connectMongo = require("connect-mongo");
import cookieParser = require("cookie-parser");
import cors = require("cors");
import express = require("express");
import helmet = require("helmet");
// import mongoose = require("mongoose");
import morgan = require("morgan");
import session = require("express-session");
import validator = require("express-validator");

import { mongo, node } from "../config";
import { logger } from "./helpers/logger";

export class Server {
  public async init() {
    const app = await this.configure();
    app.listen(node.port);
    logger.info(`Server for ${node.env} started on ${node.port}`);
    return { app };
  }
  
  private async configure() {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(validator());

    // Session
    // const MongoStore = connectMongo(session);
    app.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: "secret"
      })
    );
    
    let route = "/api";
    if (node.env === "development") {
      // route = "/dev/api";
      app.use(morgan("dev"));
    }

    const { router } = await import("./routes");
    app.use(route, router);


    return app;
  }
}
