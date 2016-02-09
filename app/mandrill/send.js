'use strict';

const mandrill = require('mandrill-api/mandrill');
const TOKEN = process.env.MANDRILL_TOKEN;
const m = new mandrill.Mandrill(TOKEN);

function send(data, callback) {

  /* message
   * Object containing the email configuration.
   * Docs: https://mandrillapp.com/api/docs/messages.nodejs.html
   */
  const message = {
      'subject': `RE: ${data.subject}`,
      'from_email': data.sender,
      'from_name': 'Webhook',
      'to': [{
              'email': data.addressee,
              'type': 'to'
          }],
      'headers': {
              'Reply-To': data.sender
          },
      'important': true,
      'track_opens': true,
      'track_clicks': null,
      'auto_text': null,
      'auto_html': null,
      'inline_css': null,
      'url_strip_qs': null,
      'preserve_recipients': null,
      'view_content_link': null,
      'tracking_domain': null,
      'signing_domain': null,
      'return_path_domain': null,
      'merge': true,
      'merge_vars': [{
        'rcpt': data.sender,
        'vars': [
          {
            'name': 'todo',
            'content': 'todo'
          }
        ]
      }],
      'tags': ['webhook']
  };

  // An array of template content to send.
  const template_content = [
      {
          'name': 'header',
          'content': data.header
      },
      {
          'name': 'body',
          'content': data.body
      },
      {
          'name': 'footer',
          'content': data.footer
      }
  ];

  // Mandrill API request configuration.
  const config = {
      template_name: 'webhook-template',
      template_content: template_content,
      message: message,
      async: false
  };

  /* sendTemplate
   * Send an email to the addressee using Mandrill API.
   * If everything is OK, Mandrill returns an Object containing the operation result like this:
   *    [{
   *        'email': 'recipient.email@example.com',
   *        'status': 'sent',
   *        'reject_reason': 'hard-bounce',
   *        '_id': 'abc123abc123abc123abc123abc123'
   *    }]
   * But if an error happens, it returns a Object containing the error details.
   *
   * @params {Object} data
   * @params {Function} callback
   * @retuns {Function} callback
   */
  m.messages.sendTemplate(config, function(result) {
      callback(null, result);  
  }, function(error) {
      callback(error);
  });
}

module.exports = send;
