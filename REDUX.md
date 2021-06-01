## Redux Setup

1. Install redux dependencies in the root folder of project:

```
$ npm install --save redux react-redux
```

2. Create store and import redux components in index.js:

```javascript
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// local files
import App from "./components/App";

const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
```

_createStore takes 3 args: reducer, initialState, middleware_

3. Setup reducers folder in src and create files for the different reducer types and create the reducers inside:

```javascript
export default function (state = {}, action) {
    switch (action.type) {
        default:
            return state;
    }
}
```

_The first argument is the state, the second the action type_

4. Import the reducers into the reducer folders index.js file and combine them together with redux:

```javascript
import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
    auth: authReducer,
});
```

5. Import the reducer and apply it to your store in the src/index.js file:

```javascript
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware());
```

6. Install middleware in root directory:

```
$ npm install --save redux-thunk
```

7. Import redux-thunk and apply middleware:

```javascript
import reduxThunk from "redux-thunk";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
```

_reduxthunk gives direct access to dispatch function in redux. it inspects returns from functions in action and passes through dispatch to reducer_

8. Setup actions library, in component directory create folder called actions and create a new file in it called index.js:

```javascript
import axios from "axios";
import { FETCH_USER } from "./types";

const fetchUser = () => {
    axios.get("/api/current_user");
};
```

9. Setup types file in actions folder as well:

```javascript
export const FETCH_USER = "fetch_user";
```

10. Connect files needing access to the global state as follows:

```javascript
import { connect } from "react-redux";
import * as actions from "../actions";

export default connect(null, actions)(App);
```

_the connect function takes two args, mapstatetoprops function and action creators_
