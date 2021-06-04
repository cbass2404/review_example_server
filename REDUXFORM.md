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

3. Connect your form to reduxform like the example:

```javascript
import { reduxForm } from "redux-form";

const SurveyForm = () => {
    return <div>SurveyForm</div>;
};

export default reduxForm({
    form: "surveyForm",
})(SurveyForm);
```

_reduxForm only takes one argument, which is the form name_

4. Set up text fields for reduxForm:

```javascript
import { reduxForm, Field } from "redux-form";

const SurveyForm = ({ handleSubmit }) => {
    return (
        <div>
            <form onSubmit={handleSubmit((values) => console.log(values))}>
                <Field type="text" name="surveyTitle" component="input" />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "surveyForm",
})(SurveyForm);
```

_This is the bare minimum properties you must assign to the Field component_
