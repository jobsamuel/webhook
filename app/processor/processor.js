'use strict';

const Firebase = require('firebase');
const respond = require('./../response/response');
const FBURI = process.env.FBURI;
const ref = new Firebase(FBURI);

function processor() {
  console.log('Starting listening inbound events...');

  ref.child('inbound').on('child_added', function(snapshot) {
    const raw = snapshot.val();
    const key = snapshot.key();

    if (!raw.processed) {
      const email = {
        email: raw.msg.email,
        from_name: raw.msg.from_name || 'N/A',
        from_email: raw.msg.from_email,
        subject: raw.msg.subject,
        message: raw.msg.text,
        timestamp: raw.ts
      };

      ref.child('processed').push(email, function(error) {
        if (error) {
          return console.log(error);
        }

        ref.child('inbound').child(key).child('processed').set(true);
      });

      respond(email, function(error) {
        if (error) {
          return console.log(error);
        }
      });
    }
  });
}

module.exports = processor;
