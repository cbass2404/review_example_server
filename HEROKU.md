## Deploying to heroku

1. Dynamic port binding
   _Heroku tells us which port our app will use, so we need to make sure we listen to the port they tell us to_

```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT);
```

2. Specify Node Environment
   _We want to use a specific version of node, so we need to tell heroku which version we want_

```json
"engines": {
    "node": "8.1.1",
    "npm": "5.0.3"
},
```

_In package.json_

3. Specify start script
   _Instruct Heroku what command to run to start our server running_

```json
"scripts": {
    "start": "node index.js"
  },
```

_In package.json_

4. Create .gitignore file
   _We don't want to include dependencies, Heroku will do that for us_

5. Create keys in Heroku by the following instructions:
   settings > config variables

6. You may need to customize the build process for heroku, for information go to:
   https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process

## Using the heroku cli

1. Login to heroku

```
$ heroku login
```

2. Initialize

```
$ heroku create
```

3. Set git repository to second address given

```
$ git remote add heroku **LINK**
```

4. Push to heroku

```
$ git push heroku main
```

_If you receive any errors run the command "heroku logs" to see what went wrong_

5. Be sure to use seperate keys for development and Production.

6. Clear heroku cache by the following:

```
$ heroku plugins:install heroku-builds
$ heroku builds:cache:purge -a appname
```

_If no new deploys use the following:_

```
$ git commit --allow-empty -m "Purge cache"
$ git push heroku master
```

7. To make heroku install monolithic style client dependencies add this to package.json scripts section:

```json
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

_https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process_
