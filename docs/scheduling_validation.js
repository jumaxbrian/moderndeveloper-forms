var validator = getValidator();

var schedulingForm = document.getElementById("scheduling-form");

schedulingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    //get nodes
    var date = document.getElementById("date"),
        hours = document.getElementById("hours"),
        mins = document.getElementById("mins"),
        timezone = document.getElementById("timezone"),
        message = document.getElementById("message"),
        contactNo = document.getElementById("phone_no"),
        email = document.getElementById("email"),
        errorMsgNode = document.getElementById("error-msg"),
        validFlag = true,
        errorMsg = "";


    //reset invalid tag on elements
    var nodeInputArray = [date, hours, mins, timezone, message, contactNo, email];
    resetValidFlag();
    for (var i = 0; i < nodeInputArray.length; i++) {
        resetErroneousElement(nodeInputArray[i]);
        errorMsg = ""
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

    //validation for contactNo
    if (validator.isEmpty(contactNo.value)) {
        errorMsg = "Contact No cannot be empty";
        flagNodeAsInvalid(contactNo);

    } else if (validator.isOfLengthOrLessThan(contactNo.value, 2)) {
        flagNodeAsInvalid(contactNo);
        errorMsg = "Contact No cannot be less than 3 characters";
    } else if (!validator.isPhoneNumber(contactNo.value)) {
        flagNodeAsInvalid(contactNo);
        errorMsg = "Contact No must start with the code +254 and be of length 13.";
    }

    //validation for message
    if (validator.isEmpty(message.value)) {
        flagNodeAsInvalid(message);
        errorMsg = "Message cannot be empty";
    } else if (validator.isOfLengthOrLessThan(message.value, 2)) {
        flagNodeAsInvalid(message);
        errorMsg = "Message cannot be less than 3 characters";
    }

    //validation for timezone
    if (validator.isEmpty(timezone.value)) {
        flagNodeAsInvalid(timezone);
        errorMsg = "Timezone cannot be empty";
    } else if (validator.isOfLengthOrLessThan(timezone.value, 2)) {
        flagNodeAsInvalid(timezone);
        errorMsg = "Timezone cannot be less than 3 characters";
    }

    //validating minutes
    if (validator.isEmpty(mins.value)) {
        flagNodeAsInvalid(mins);
        errorMsg = "Minutes cannot be empty";
    } else if (!validator.isMinute(mins.value)) {
        flagNodeAsInvalid(mins);
        errorMsg = "Minutes are between 0 and 59 inclusive.";
    }

    //validating hours
    if (validator.isEmpty(hours.value)) {
        flagNodeAsInvalid(hours);
        errorMsg = "Hours cannot be empty";
    } else if (!validator.isHour(hours.value)) {
        flagNodeAsInvalid(hours);
        errorMsg = "Hours are between 0 and 23 inclusive.";
    }

    //validating date
    try {
        validator.isDate(date);
        if (validator.isBeforeToday(date.value)) {
            flagNodeAsInvalid(date);
            errorMsg = "You can only schedule things from today onwards.";
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
        // console.log(errorMsg);
    }

    // console.log(contactNo, timezone, email, date, password1, password2);
})

// console.log(schedulingForm);