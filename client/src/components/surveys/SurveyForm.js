import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utls/validateEmails";
import formFields from "./formFields";

const SurveyForm = ({ handleSubmit, setShowFormReview }) => {
    const renderFields = () =>
        formFields.map(({ label, name }) => {
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

    errors.recipients = validateEmails(values.recipients || "");

    formFields.forEach(({ name, errorMessage }) => {
        if (!values[name]) {
            errors[name] = errorMessage;
        }
    });

    return errors;
};

export default reduxForm({
    validate,
    form: "surveyForm",
    destroyOnUnmount: false,
})(SurveyForm);
