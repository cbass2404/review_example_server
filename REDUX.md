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

## Redux Redirects

---

1. Import withRouter from react-router-dom:

```javascript
import { withRouter } from "react-router-dom";
```

2. Wrap the exported component with redux in the withRouter function:

```javascript
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
```

_This gives history to the hook_

3. This gives a history prop to the component it was imported into, pass it along to the action creator:

```javascript
<button
    onClick={() => submitSurvey(formValues, history)} // history is the destructured argument from props being sent along to the submitSurvey redux action
    className="green btn-flat right white-text"
>
    Send Survey
    <i className="material-icons right">email</i>
</button>
```

4. Add the history argument into the action creator in the redux files:

```javascript
export const submitSurvey = (values, history) => async (dispatch) => {
    const res = await axios.post("/api/surveys", values);

    history.push("/surveys");
    dispatch({ type: "FETCH_USER", payload: res.data });
};
```
