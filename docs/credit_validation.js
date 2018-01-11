var validator = getValidator();

var creditForm = document.getElementById("credit-form");

creditForm.addEventListener('submit', function (event) {
    event.preventDefault();

    //get nodes
    var name = document.getElementById("cardholder-name"),
        number1 = document.getElementById("card-number-1"),
        number2 = document.getElementById("card-number-2"),
        number3 = document.getElementById("card-number-3"),
        number4 = document.getElementById("card-number-4"),
        month = document.getElementById("month"),
        year = document.getElementById("year"),
        csv = document.getElementById("csv"),
        errorMsgNode = document.getElementById("error-msg"),
        validFlag = true,
        errorMsg = "";


    //reset invalid tag on elements
    var nodeInputArray = [name, number1, number2, number3, number4, month, year, csv];
    resetValidFlag();
    for (var i = 0; i < nodeInputArray.length; i++) {
        resetErroneousElement(nodeInputArray[i]);
        errorMsg = ""
    }

    //validating cvs
    if (validator.isEmpty(csv.value)) {
        errorMsg = "csv cannot be empty";
        flagNodeAsInvalid(csv);
    } else if (!validator.isEqual(csv.value, 3)) {
        flagNodeAsInvalid(csv);
        errorMsg = "csv must have 3 characters";
    } else if (!validator.containsOnlyNumbers(csv.value)) {
        flagNodeAsInvalid(csv);
        errorMsg = "csv must have only numeric characters.";
    }

    //validating year
    if (validator.isEmpty(year.value)) {
        errorMsg = "Year cannot be empty";
        flagNodeAsInvalid(year);
    } else if (!validator.isEqual(year.value.trim(), 4)) {
        flagNodeAsInvalid(year);
        errorMsg = "Year must have 4 characters";
    } else if (!validator.containsOnlyNumbers(year.value)) {
        flagNodeAsInvalid(year);
        errorMsg = "Year must have only numeric characters.";
    }

    //validating month
    // var months = ['Jan-01', 'Feb-02', 'Mar-03', 'Apr-04', 'May-05', 'Jun-06', 'Jul-07', 'Aug-08', 'Sep-09', 'Oct-10', 'Nov-11', 'Dec-12']
    if (validator.isEmpty(month.value)) {
        errorMsg = "Month cannot be empty";
        flagNodeAsInvalid(month);
    } else if (!validator.isMonth(month.value)) {
        flagNodeAsInvalid(month);
        errorMsg = "Month given is not a valid input.";
    }

    //validating creditCardNo
    var creditCardNo = number1.value + number2.value + number3.value + number4.value,
        creditCardValidFlag = true;
    console.log("Credit card no ", creditCardNo);
    if (validator.isEmpty(creditCardNo)) {
        errorMsg = "credit Card Number cannot be empty";
        creditCardValidFlag = false;
        // flagNodeAsInvalid(creditCardNo);
    } else if (!validator.isCreditCard(creditCardNo)) {
        // flagNodeAsInvalid(creditCardNo);
        errorMsg = "Credit card number is not a valid.";
        creditCardValidFlag = false;
    }

    if (!creditCardValidFlag) {
        flagNodeAsInvalid(number1);
        flagNodeAsInvalid(number2);
        flagNodeAsInvalid(number3);
        flagNodeAsInvalid(number4);
    }

    //validating name
    if (validator.isEmpty(name.value)) {
        errorMsg = "Name cannot be empty";
        flagNodeAsInvalid(name);
    } else if (validator.isOfLengthOrLessThan(name.value, 2)) {
        flagNodeAsInvalid(name);
        errorMsg = "Name cannot be less than 3 characters";
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

    // console.log(firstName, lastName, email, date, password1, password2);
})

console.log(creditForm);