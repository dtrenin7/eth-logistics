/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/create_account', require('./api/create_account'));
  app.use('/api/pay', require('./api/pay'));
  app.use('/api/pay_cc', require('./api/pay_cc'));
  app.use('/api/approve_cc', require('./api/approve_cc'));
  app.use('/api/get_tx_result', require('./api/get_tx_result'));
  app.use('/api/make_order', require('./api/make_order'));
  app.use('/api/begin', require('./api/begin'));
  app.use('/api/complete', require('./api/complete'));
  app.use('/api/cancel', require('./api/cancel'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
