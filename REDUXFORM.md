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

5. For form validation you can pass a second argument in reduxForm. A function you make that returns an object to check the values given.

```javascript
const validate = (values) => {
    const errors = {};

    errors.emails = validateEmails(values.emails || "");

    FIELDS.forEach(({ name, errorMessage }) => {
        if (!values[name]) {
            errors[name] = errorMessage;
        }
    });

    return errors;
};

export default reduxForm({
    validate,
    form: "surveyForm",
})(SurveyForm);
```

_redux form checks the returned object. if it is empty it passes, if the object has values it failed validation_

6. To validate further create functions to return an object if there are errors:

```javascript
const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line import/no-anonymous-default-export
export default (emails) => {
    const invalidEmails = emails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email && !re.test(email));

    if (invalidEmails.length) {
        return `Invalid email(s): ${invalidEmails}`;
    }

    return;
};
```

7. To persist data from one page to another add the following destroyonunmount: false to reduxForm:

```javascript
export default reduxForm({
    validate,
    form: "surveyForm",
    destroyOnUnmount: false,
})(SurveyForm);
```

8. To make persistent data clear add the following to the lowest common parent:

```javascript
export default reduxForm({ form: "surveyForm" })(SurveyNew);
```

_the default value for reduxForm is to dump data on dismount, this tricks it into dumping it when the parent unmounts_
