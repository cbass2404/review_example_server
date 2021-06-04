const SurveyField = ({ input, label }) => {
    return (
        <div>
            <label>
                {label}
                <input {...input} />
            </label>
        </div>
    );
};

export default SurveyField;
