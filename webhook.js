'use strict';

const http = require('http');
const app = require('./app/app');

console.log('Initializing Webhook...');

http.createServer(app).listen(app.set('port'), function() {
  console.info('Webhook running at port: ' + app.set('port'));
});
