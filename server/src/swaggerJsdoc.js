const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const express = require("express");
const router = express.Router();

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: "Covid News API",
      version: "1.0.0",
      description:
        "It is a service that allows you to register and log in to be up to date with all the coronavirus news and also to be able to search for them by title, source and date ranges",
    },
    basePath: "/",
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ["index.js"],
};

const specs = swaggerJsdoc(options);
module.exports = () => {
  router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
