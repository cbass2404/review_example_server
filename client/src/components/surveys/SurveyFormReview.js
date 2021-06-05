import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({
    setShowFormReview,
    formValues,
    submitSurvey,
    history,
}) => {
    const reviewFields = formFields.map(({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken- 3 white-text btn-flat"
                onClick={setShowFormReview}
            >
                <i className="material-icons left">arrow_back</i>
                Back
            </button>
            <button
                onClick={(e) => {
                    submitSurvey(formValues, history);
                    e.disabled = true;
                }}
                className="green btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    formValues: state.form.surveyForm.values,
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
