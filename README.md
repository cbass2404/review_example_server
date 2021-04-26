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
