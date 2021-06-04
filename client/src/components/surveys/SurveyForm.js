import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utls/validateEmails";

const FIELDS = [
    {
        label: "Survey Title",
        name: "title",
        errorMessage: "You must provide a title",
    },
    {
        label: "Subject Line",
        name: "subject",
        errorMessage: "You must provide a subject",
    },
    {
        label: "Email Body",
        name: "body",
        errorMessage: "You must provide a body",
    },
    {
        label: "Recipient List",
        name: "emails",
        errorMessage: "You must provide emails seperated by commas",
    },
];

const SurveyForm = ({ handleSubmit, setShowFormReview }) => {
    const renderFields = () =>
        FIELDS.map(({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            );
        });

    return (
        <div>
            <form onSubmit={handleSubmit(setShowFormReview)}>
                {renderFields()}

                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                    <i className="material-icons left">cancel</i>
                </Link>

                <button
                    className="teal btn-flat right white-text"
                    type="submit"
                >
                    Next
                    <i className="material-icons right">done</i>
                </button>
            </form>
        </div>
    );
};

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
