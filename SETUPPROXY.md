## Using Proxy Middleware

---

Proxy Middleware is used to make your localhost 3000 port use a different port automatically for specified routes.

1. First install the library into your project:

```
$ npm install --save http-proxy-middleware@1.3.1
```

2. In your src directory create a file named setupProxy.js and fill in the following, edit as needed:

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/api", "/auth/google"],
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};
```

_Note, if your server is using a different port edit it accordingly. Too, any routes that need to use that port must be included in the route array_
