const Validator = require("validator");
const isEmpty = require("is-empty");


// Verficare campuri pentru inregistrare
module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields in empty strings in order to use them
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmpassword = !isEmpty(data.confirmpassword) ? data.confirmpassword : "";

    // validare username prezent
    if (Validator.isEmpty(data.username)) {
        errors.name = "UserName is a requried field";
    }

    // name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.name = "First name fileld is required";
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.name = "Last name fileld is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.confirmpassword)) {
        errors.confirmpassword = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.confirmpassword)) {
        errors.confirmpassword = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}