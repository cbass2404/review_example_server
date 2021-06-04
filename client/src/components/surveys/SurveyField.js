const SurveyField = ({ input, label, meta: { touched, error } }) => {
    return (
        <div>
            <label>
                {label}
                <input {...input} style={{ marginBottom: 5 }} />
            </label>
            <div className="red-text" style={{ marginBottom: 20 }}>
                {touched && error}
            </div>
        </div>
    );
};

export default SurveyField;
