## Passport for oauth

1. Run the following command in your terminal to install it to your project:

```
    $ npm install passport passport-google-oauth20
```

_The second passport import is specifically for google_

2. Go to the following link:
   https://console.cloud.google.com/projectselector2/apis/dashboard?pli=1&supportedpurview=project

3. Traverse the following links:

```
Dashboard > Create Project > Enter Project Name > Create
```

4. Traverse the following links after the project creation is complete:

```
OAuth consent screen > External > Create > App name and required fields
```

5. Traverse the following links after Consent is set up:

```
Credentials > Create Credentials > OAuth client ID > Set Application Type > App name > Set Origins URI > Set Redirect URI
```

_Origins and Redirect are determined by the routes you set up in Node, no wildcards use /callback at the end of redirect URI for google._

6. Import passport into index.js after express import but before app.

```javascript
require("dotenv").config();
const express = require("express");
require("./services/passport");

const app = express();
```

7. Setup passport

```javascript
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("access token", accessToken);
            console.log("refresh token", refreshToken);
            console.log("profile", profile);
        }
    )
);
```

7. Setup Routes:

```javascript
const passport = require("passport");

module.exports = (app) => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );

    app.get("/auth/google/callback", passport.authenticate("google"));
};
```

_Do not forget to export the routes to your index.js_

8. When using passport you have to tell it to be done and pass in the argument of the object created:

```javascript
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then((existingUser) => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({ googleId: profile.id })
                            .save()
                            .then((user) => done(null, user));
                    }
                })
                .catch((err) => {
                    console.error("User Authentication", err);
                });
        }
    )
);
```

_Done takes two argument, done(error, object)_
