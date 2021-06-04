const SurveyField = ({ input }) => {
    console.log(input);
    return (
        <div>
            <input {...input} />
        </div>
    );
};

export default SurveyField;
