## Redux Form

---

A library to store form data in redux to save for review later. For more information use the following link to review the documentation.

_redux-form.com_

## Setup

---

1. In your main directory install it with the following command:

```
$ npm install redux-form --legacy-peer-deps
```

2. In redux reducer index file import the reducer as follows:

```javascript
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
});
```
