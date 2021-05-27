const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            new User({ googleId: profile.id }).save();
        }
    )
);
