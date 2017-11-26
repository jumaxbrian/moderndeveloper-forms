var validator = getValidator();

var signupForm = document.getElementById("signup-form");

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    //get nodes
    var firstName = document.getElementById("fname"),
        lastName = document.getElementById("lname"),
        email = document.getElementById("email"),
        date = document.getElementById("date"),
        password1 = document.getElementById("password1"),
        password2 = document.getElementById("password2"),
        errorMsgNode = document.getElementById("error-msg"),
        validFlag = true,
        errorMsg = "";


    //reset invalid tag on elements
    var nodeInputArray = [firstName, lastName, email, date, password1, password2];
    resetValidFlag();
    for (var i = 0; i < nodeInputArray.length; i++) {
        resetErroneousElement(nodeInputArray[i]);
        errorMsg = ""
    }

    //validating date
    try {
        validator.isDate(date);
        if (!validator.isMoreThan18(date.value)) {
            flagNodeAsInvalid(date);
            errorMsg = "You need to be at least 18 years old to use this service.";
        }

    } catch (error) {
        flagNodeAsInvalid(date);
        errorMsg = "Please input a valid date.";
    }
    if (validator.isEmpty(date.value)) {
        flagNodeAsInvalid(date);
        errorMsg = "Date cannot be empty";
    } else if (validator.isOfLengthOrLessThan(date.value, 2)) {
        flagNodeAsInvalid(date);
        errorMsg = "Date cannot be less than 3 characters";
    }

    //validating email
    if (!validator.isEmailAddress(email.value)) {
        flagNodeAsInvalid(email);
        errorMsg = "The email address you have provided is not a valid one.";
    } else if (validator.isEmpty(email.value)) {
        flagNodeAsInvalid(email);
        errorMsg = "Email cannot be empty";
    } else if (validator.isOfLengthOrLessThan(email.value, 2)) {
        flagNodeAsInvalid(email);
        errorMsg = "Email cannot be less than 3 characters";
    }

    //validation for lastName
    if (validator.isEmpty(lastName.value)) {
        flagNodeAsInvalid(lastName);
        errorMsg = "Last Name cannot be empty";
    } else if (validator.isOfLengthOrLessThan(lastName.value, 2)) {
        flagNodeAsInvalid(lastName);
        errorMsg = "Last Name cannot be less than 3 characters";
    }

    //validation for firstName
    if (validator.isEmpty(firstName.value)) {
        errorMsg = "First Name cannot be empty";
        flagNodeAsInvalid(firstName);

    } else if (validator.isOfLengthOrLessThan(firstName.value, 2)) {
        flagNodeAsInvalid(firstName);
        errorMsg = "First Name cannot be less than 3 characters";
    }






    function flagNodeAsInvalid(nodeVar) {
        validFlag = false;
        nodeVar.className = "invalid";

    }

    function resetErroneousElement(nodeInput) {
        nodeInput.classList.remove("invalid");

    }

    function resetValidFlag() {
        errorMsgNode.innerText = "";
        validFlag = true;
    }

    if (!validFlag) {
        errorMsgNode.innerText = errorMsg;
        console.log(errorMsg);
    }

    // console.log(firstName, lastName, email, date, password1, password2);
})

console.log(signupForm);