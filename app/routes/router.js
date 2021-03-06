'use strict';

const Firebase = require('firebase');
const express = require('express');
const async = require('async');
const router = express.Router();
const FBURI = process.env.FBURI;
const ref = new Firebase(FBURI);

router.route('/')
  .head(function(req, res) {
    res.send({
      message: 'Hello world!'
    });
  })

  .post(function(req, res) {
    const mandrillEvent = JSON.parse(req.body.mandrill_events);
    
    async.each(mandrillEvent, function(event, callback) {
      ref.child('inbound').push(event, function(error) {
        if (error) {
          return callback(error);
        }
        
        callback();
      });
    }, function(error) {
      if (error) {
        return res
          .status(500)
          .send({
            sync: 'failed', 
            error: error
          });
      }

      res.send({
        sync: 'successfull'
      });
    });
  });

router.get('/about', function(req, res) {
  res.send({
    message: 'Hi, I\'m webhook!',
    status: 'OK'
  });
});

module.exports = router;
