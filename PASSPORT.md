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

_Be sure to setup the google+ api_

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
            proxy: true,
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("access token", accessToken);
            console.log("refresh token", refreshToken);
            console.log("profile", profile);
        }
    )
);
```

_proxy: true is only needed if you are being redirected through a proxy to say that it is safe, like heroku does through aws_

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

9. Set users using the serializeUser and deserializeUser functions:

```javascript
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});
```

10. Install the dependency to make use of cookies in express:

```
$ npm install --save cookie-session
```

11. Require in passport and cookie-session in index.js file:

```javascript
const cookieSession = require("cookie-session");
const passport = require("passport");
```

12. Instruct passport to make use of cookies to control authentication:

```javascript
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY],
    })
);
app.use(passport.initialize());
app.use(passport.session());
```
