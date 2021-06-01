## Emaily

---

A review server using Node, Express, Passport and Heroku for server deployment. It is used to create users from a google oauth authorization and allow the user to send out business related surveys to their customers through email, store and analyze the results, and allow the user to track them over time or respond as needed.

### Development:

---

_For client side repository go to: https://github.com/cbass2404/review_server_client_

1. To start the server a single time.

```
$ npm start
```

2. For development and auto refreshing the node on changes:

```
$ npm run dev
```

_This is possible through nodemon under the package.json script configuration_

## Server Routes

---

```
Route               Type    Auth    Use
-----------------------------------------------------------------------------
/auth/google        GET     No      !args, google oauth link
/api/current_user   GET     Yes     !args, checks cookie in browser
/api/logout         GET     Yes     !args, deletes cookie in browser
/api/stripe         POST    YES     Token, adds survey credits on successful payments
```
