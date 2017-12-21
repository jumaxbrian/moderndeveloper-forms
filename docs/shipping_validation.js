var validator = getValidator();

//get nodes
var firstName = document.getElementById("fname"),
    lastName = document.getElementById("lname"),
    address = document.getElementById("address"),
    city = document.getElementById("city"),
    country = document.getElementById("country"),
    billingFirstName = document.getElementById("billing-fname"),
    billingLastName = document.getElementById("billing-lname"),
    billingAddress = document.getElementById("billing-address"),
    billingCity = document.getElementById("billing-city"),
    billingCountry = document.getElementById("billing-country"),
    // billingFirstName = document.getElementById("billing-fname"),
    errorMsgNode = document.getElementById("error-msg"),
    validFlag = true,
    errorMsg = "";


document.addEventListener("DOMContentLoaded", function (event) {
    var equalsShippingChkBox = document.getElementById("equals-shipping");
    equalsShippingChkBox.addEventListener('change', function (event) {
        if (equalsShippingChkBox.checked) {
            // copy values to billing section
            updateBillingFromShipping();
        }
    });

    function updateBillingFromShipping() {
        billingFirstName.value = firstName.value;
        billingLastName.value = lastName.value;
        billingAddress.value = address.value;
        billingCity.value = city.value;
        billingCountry.value = country.value;

    }
});

var shippingForm = document.getElementById("shipping-form");

shippingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    //reset invalid tag on elements
    var nodeInputArray = [firstName, lastName, address, city, country, billingFirstName, billingLastName, billingAddress, billingCity, billingCountry];
    var nodeInputArrayLabels = ["First Name", "Last Name", "Address", "City", "Country", "Billing First Name",
        "Billing Last Name", "Billing Address", "Billing City", "Billing Country"];
    resetValidFlag();
    for (var i = nodeInputArray.length - 1; i >= 0; i--) {
        resetErroneousElement(nodeInputArray[i]);
        errorMsg = ""
    }

    for (var i = nodeInputArray.length - 1; i >= 0; i--) {
        validateGenericNodeInput(nodeInputArray[i], nodeInputArrayLabels[i]);
    }

    function validateGenericNodeInput(nodeInput, label) {
        if (validator.isEmpty(nodeInput.value)) {
            errorMsg = label + " cannot be empty";
            flagNodeAsInvalid(nodeInput);

        } else if (validator.isOfLengthOrLessThan(nodeInput.value, 2)) {
            flagNodeAsInvalid(nodeInput);
            errorMsg = label + " cannot be less than 3 characters";
        }
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

console.log(shippingForm);