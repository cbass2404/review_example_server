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
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid("apikeydlkjafdk234");
        this.from_email = new helper.Email("test@email.com");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: this.toJSON(),
        });

        const response = this.sgApi.API(request);
        return response;
    }
}
```

_Be sure to format all email addresses before sending it to the mail class_
_Unfortunately there isn't a large explanation on the sendgrid documentation on how this code works or why it is the way it is. You just have to do it._

4. Create a template for your email body:

```javascript
module.exports = (survey) => {
    return `<div> ${survey.body} </div>`;
};
```

5. Be sure to integrate these into your api call for the email template:

```javascript
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients
                .split(",")
                .map((email) => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();
    });
};
```
