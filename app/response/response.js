'use strict';

const send = require('./../mandrill/send');

function respond(email, callback) {
  const response = createResponse(email.message, email.from_name);
  const data = {
    sender: email.email,
    addressee: email.from_email,
    subject: email.subject,
    header: `<h3>${response.header}</h3>`,
    body: `<p>${response.body}</p>`,
    footer: `<p>${response.footer}</p>`
  };

  send(data, function(error, result) {
    if (error) {
      return callback(error);
    }

    if (result[0].status === 'sent') {
      return callback(null, true);
    }

    callback(null, false);
  });
}

function createResponse(message, name) {
  return {
    header: `Hi there ${name}!`,
    body: 'Your email has been received.',
    footer: 'Regards!'
  }
}

module.exports = respond;
