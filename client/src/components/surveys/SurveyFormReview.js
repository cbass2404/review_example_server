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

export default SurveyFormReview;
