const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// eslint-disable-next-line import/no-anonymous-default-export
export default (emails) => {
    const invalidEmails = emails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email && !re.test(email));

    if (invalidEmails.length) {
        return `Invalid email(s): ${invalidEmails}`;
    }

    return;
};
