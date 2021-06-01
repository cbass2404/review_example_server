## Emaily

---

A react.js app using ... ... to create users from a google oauth authorization and allow the user to send out business related surveys to their customers through email, store and analyze the results, and allow the user to track them over time or respond as needed.

## Start Instructions

---

1. Traverse to the folder you want to store your files in, then run the following command:

```
$ git clone https://github.com/cbass2404/review_server_client
```

_For the review server documentation and files go to: https://github.com/cbass2404/review_example_server_

2. CD into the folder...

```
$ cd review_server_client
```

3. Install dependencies:

```
$ npm install
```

4. Start server:

```
$ npm start
```

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

## Server Files

---

https://github.com/cbass2404/review_example_server
