import { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = () => {
    const [showFormReview, setShowFormReview] = useState(false);

    const renderContent = () => {
        if (showFormReview) {
            return (
                <SurveyFormReview
                    setShowFormReview={() => setShowFormReview(false)}
                />
            );
        }

        return <SurveyForm setShowFormReview={() => setShowFormReview(true)} />;
    };

    return <div>{renderContent()}</div>;
};

export default reduxForm({ form: "surveyForm" })(SurveyNew);
