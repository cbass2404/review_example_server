## Stripe

---

### Rules for billing:

---

-   never accept raw cc numbers
-   never store credit card numbers
-   always use an outside payment processor
-   Billing is hard
-   possible to avoid monthly payments/recurring payments and multiple plans
-   fraud and chargebacks are a pain

## Instructions for CLIENT

---

1. Install react-stripe checkout in root directory:

```
$ npm install --save react-stripe-checkout
```

_https://github.com/azmenak/react-stripe-checkout_

2. Setup projects secret key and public key in variable files on backend, only the public key on the frontend. Preferabbly in a .env.production and .env.development file.

3. Setup Payment component to be the stripe checkout library:

```javascript
import StripeCheckout from "react-stripe-checkout";

const Payments = () => {
    return (
        <StripeCheckout
            name="Emaily"
            description="$5 for 5 survey credits"
            amount={500}
            token={(token) => console.log(token)}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
            <button className="btn">Add Credits</button>
        </StripeCheckout>
    );
};

export default Payments;
```

_button child component is only used to change the default appearance of the stripe button_

4. Import the component to wherever you want it to be in your app and set it up to be used:

```javascript
import PaymentsComponent from "./paymentscomponent";

<PaymentsComponent />;
```

5. Stripe will return a token to your app with data about the transaction and user.

## Instructions for SERVER

---

https://stripe.com/docs/api

1. Install stripes library in main directory:

```
$ npm install --save stripe
```

2. Require the library into your project:

```javascript
const keys = require("../config/keys");
const stripe = require("stripe")(keys.STRIPE_SECRET_KEY);
```

3. Use body-parser to parse returned token into body format:

```
$ npm install --save body-parser
```

_https://www.npmjs.com/package/body-parser_

> In index.js file require in body-parser and tell the app to use it:

```javascript
const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
```

4. Be sure to handle the stripe charges in route, it should have similar settings to the client side token sent to backend:

```javascript
const keys = require("../config/keys");
const stripe = require("stripe")(keys.STRIPE_SECRET_KEY);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
    app.post("/api/stripe", requireLogin, async (req, res) => {
        if (!req.user) {
            return res.status(401).send({ error: "You must log in!" });
        }
        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            description: "$5 for 5 surveys",
            source: req.body.id,
        });

        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};
```

_Be sure to set up middleware to check for user as below_

```javascript
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: "You must log in!" });
    }

    next();
};
```
