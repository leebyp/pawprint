"use strict";

var morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware');

/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(morgan('dev'));
  // bodyParser security concerns - think about using
  app.use(bodyParser());
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../client'));
  app.use('/extra', routers.ExtraRouter);
  app.use(middle.logError);
  app.use(middle.handleError);
};