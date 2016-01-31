'use strict';

const Firebase = require('firebase');
const FBURI = process.env.FBURI;
const TOKEN = process.env.FB_AUTH_TOKEN;
const ref = new Firebase(FBURI);

function fb() {
  console.log('Authenticating Firebase client using a custom token...');

  ref.authWithCustomToken(TOKEN, function(error, authData) {
    if (error) {
      const _error = new Error();
      _error.message = 'Firebase authentication failed.';
      _error.details = error;

      return console.log(_error);
    }

    console.log('Firebase authentication successful!');
  });
}

module.exports = fb;
