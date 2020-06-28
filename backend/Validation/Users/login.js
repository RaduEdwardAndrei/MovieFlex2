const Validator = require("validator");
const isEmpty = require("is-empty");


// Verficare campuri pentru inregistrare
module.exports = function validateLoginInput(data) {
    let errors = {};
    let isUsingEmail = false;

    // Convert empty fields in empty strings in order to use them
    // userInformation poate sa fie ori email ori username
    data.userInformation = !isEmpty(data.userInformation) ? data.userInformation : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // validare username prezent
    if (Validator.isEmpty(data.userInformation)) {
        errors.userInformation = "This is a requried field";
    }

    // verific daca este email si setez optiunea de email pe true
    if (Validator.isEmail(data.userInformation)) {
        isUsingEmail = true;
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
        isUsingEmail
    };
}