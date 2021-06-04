import { useState } from "react";
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

export default SurveyNew;
