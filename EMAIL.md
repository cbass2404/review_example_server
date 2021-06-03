## Email use in APIs

---

1. Use a host like sendgrid.com

2. Follow their documentation for integration.

## Use SendGrid

---

1. Install their node dependecy:

```
$ npm install --save sendgrid
```

2. Integrate in a sendgrid function:

```javascript
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("apikey");
const msg = {
    to: "test@email.com",
    from: "test@email.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail.send(msg);
```
