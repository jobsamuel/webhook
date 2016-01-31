'use strict';

const Firebase = require('firebase');
const express = require('express');
const router = express.Router();
const FBURI = process.env.FBURI;
const ref = new Firebase(FBURI);

router.route('/')
  .head(function(req, res) {
    res.send({
      message: 'Hi, I\'m webhook!'
    });
  })

  .get(function(req, res) {
      res.send({
        status: 'OK'
      });
  })

  .post(function(req, res) {
    const mandrillEvent = JSON.parse(req.body.mandrill_events);
    
    mandrillEvent.map(function(event) {
      ref.child('inbound').push(event, function(error) {
        if (error) {
          return res
            .status(501)
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
  });

module.exports = router;
