import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";

const SurveyForm = ({ handleSubmit }) => {
    const renderFields = () => {
        return (
            <div>
                <Field type="text" name="title" component={SurveyField} />
            </div>
        );
    };
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
