var validator = getValidator();

var loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    //get nodes
    var email = document.getElementById("email"),
        password = document.getElementById("password"),
        errorMsgNode = document.getElementById("error-msg"),
        validFlag = true,
        errorMsg = "";


    //reset invalid tag on elements
    var nodeInputArray = [email, password];
    resetValidFlag();
    for (var i = 0; i < nodeInputArray.length; i++) {
        resetErroneousElement(nodeInputArray[i]);
        errorMsg = ""
    }

    //validating passwords
    if (validator.isEmpty(password.value)) {
        errorMsg = "Password cannot be empty";
        flagNodeAsInvalid(password);
    } else if (validator.isOfLengthOrLessThan(password.value, 6)) {
        flagNodeAsInvalid(password);
        errorMsg = "Password cannot be less than 7 characters";
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


    //inject invalid class to erroneous nodes
    function flagNodeAsInvalid(nodeVar) {
        validFlag = false;
        nodeVar.className = "invalid";

    }

    //remove invalid class from nodes
    function resetErroneousElement(nodeInput) {
        nodeInput.classList.remove("invalid");

    }

    //removes error message from div
    function resetValidFlag() {
        errorMsgNode.innerText = "";
        validFlag = true;
    }

    //injects error message on div
    if (!validFlag) {
        errorMsgNode.innerText = errorMsg;
        console.log(errorMsg);
    }

    // console.log(firstName, lastName, email, date, password, password2);
})

console.log(loginForm);