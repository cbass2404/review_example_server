import { connect } from "react-redux";

const SurveyFormReview = ({ setShowFormReview }) => {
    return (
        <div>
            <h5>Please confirm your entries</h5>
            <button
                className="yellow darken-3 btn-flat"
                onClick={setShowFormReview}
            >
                Back
            </button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    formValues: state.form.surveyForm.values,
});

export default connect(mapStateToProps)(SurveyFormReview);
