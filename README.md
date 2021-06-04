## Emaily

---

_https://express-review-server.herokuapp.com/surveys_

A review server using Node, Express, Passport and Heroku for server deployment in a monolithic style. The client side utilizes react, redux, materialize-css, axios. It is used to create users from a google oauth authorization and allow the user to send out business related surveys to their customers through email, store and analyze the results, and allow the user to track them over time or respond as needed.

### Install:

---

1. In your cmd line traverse to the folder you want and run the command:

```
$ git clone https://github.com/cbass2404/review_example_server_
```

2. cd into the folder:

```
$ cd review_example_server
```

3. Install dependencies:

```
$ npm install
```

4. cd into client folder

```
$ cd client
```

5. Install client dependencies

```
$ npm install
```

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
Route                 Type    Auth    Use
-----------------------------------------------------------------------------
/auth/google          GET     NO      !args, google oauth link

/api/current_user     GET     YES     !args, checks cookie in browser

/api/logout           GET     YES     !args, deletes cookie in browser

/api/stripe           POST    YES     Token, adds survey credits on
                                      successful payments

/api/surveys          POST    YES     {
                                          title: string,
                                          subject: string,
                                          body: string,
                                          recipients: [{
                                              email: string,
                                              responded: boolean
                                          }],
                                          yes: {type: Number, default: 0},
                                          no: {type: Number, default: 0},
                                          dateSent: Date,
                                          lastResponded: Date
                                      }

/api/surveys/webhooks POST    YES     Feedback

/api/surveys          GET     YES     !args, returns list of surveys
                                      belonging to current_user

/api/surveys/thanks   GET     NO      !args, returns a survey participant
                                      to a thankyou landing page
```
