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

2. Create your Mailer.js file in your project and require in sendgrid and the mail function:

```javascript
const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
```

3. Create a class and set it to extend out the helper.Mail class in sendgrid library:

```javascript
class Mailer extends helper.Mail {}
```

4. Create a template for your email body:

```javascript
module.exports = (survey) => {
    return `<div> ${survey.body} </div>`;
};
```

5. Be sure to integrate these into your api call for the email template:

```javascript
const mailer = new Mailer(survey, surveyTemplate(survey));
```

<!-- Integrate in a sendgrid function:

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
``` -->
