import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

const FIELDS = [
    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email Body", name: "body" },
    { label: "Recipient List", name: "recipients" },
];

const SurveyForm = ({ handleSubmit }) => {
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
            <form onSubmit={handleSubmit((values) => console.log(values))}>
                {renderFields()}
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
