
var getValidator = function (window) {

    /* The contents of your JS file */
    var validator = {};


    validator.isEmailAddress = function (input) {
        var hasAt = input.includes('@');
        var ans = false;
        if (hasAt) {
            //split and check if it has 2 strings on both ends
            var parts = input.split('@');
            if (parts.length === 2) {
                //both parts have more than 1 character
                if ((parts[0].length >= 1) && (parts[1].length >= 1)) {
                    ans = true;
                }

            }
            console.log(parts.toString())
        }

        return ans;
    }
    /*
        var input = '@gmail.com'
        console.log(isEmailAddress(input));
        var input = 'tim@gmail.com'
        console.log(isEmailAddress(input));
        var input = 'tim@'
        console.log(isEmailAddress(input));
        var input = 'gmail.com'
        console.log(isEmailAddress(input));
        */

    //helper function for determining whether input contains only numeric characters
    validator.containsOnlyNumbers = function (input) {
        var ans = true;
        for (var i = 0; i < input.length; i++) {
            var element = input[i];
            switch (element) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    break;
                default:
                    ans = false;
                    break;
            }

            if (!ans) {
                break;
            }

        }

        return ans;

    }

    validator.isPhoneNumber = function (input) {
        var startsWith = input.substr(0, 4),
            inputNumeric = input.substr(1),
            ans = false;

        if ((startsWith === '+254') &&  //country code for Kenya
            (containsOnlyNumbers(inputNumeric)) &&
            (input.length === 13)) {
            ans = true;
            console.log(startsWith)
        }

        return ans;
    }

    // var input = '+254712040487'
    // console.log(isPhoneNumber(input));
    // var input = '254712040487'
    // console.log(isPhoneNumber(input));
    // var input = '+2547120404'
    // console.log(isPhoneNumber(input));

    validator.isDate = function (input) {
        var dateInput = new Date(input);
        // console.log(dateInput)
        return !(dateInput.toString() === 'Invalid Date')
    }

    validator.isBeforeDate = function (input, reference) {
        if (validator.isDate(input) && validator.isDate(reference)) {
            var inputDate = new Date(input),
                refDate = new Date(reference);

            return inputDate < refDate;
        } else {
            throw new Error('Inputs not valid dates.');
        }
    }

    validator.isAfterDate = function (input, reference) {
        return !validator.isBeforeDate(input, reference);
    }

    validator.isBeforeToday = function (input) {
        if (validator.isDate(input)) {
            var inputDate = new Date(input),
                today = new Date();
            // console.log('input', inputDate, 'today', today)
            return input < today;
        } else {
            throw new Error('Input not valid date.');
        }
    }

    validator.isAfterToday = function (input) {
        return !validator.isBeforeToday(input);
    }

    validator.isMoreThan18 = function (input) {
        var today = new Date();
        var dob = new Date(input),
            dateDiff = today - dob,
            oneYear = 365.25 * 1000 * 60 * 60 * 24,
            yearsSince = dateDiff / oneYear;

        return yearsSince > 18;

    }

    validator.isEmpty = function (input) {
        var inputLen = input.length,
            lengthChanged = true;

        //remove all spaces
        while (lengthChanged) {
            input = input.replace(" ", "")
            if (inputLen !== input.length) {
                lengthChanged = true;
                inputLen = input.length;
            } else {
                lengthChanged = false;
            }
        }

        // console.log(input);
        return "" === input;
    }


    // var input = '     +    l'
    // console.log(isEmpty(input));
    // var input = '            '
    // console.log(isEmpty(input));

    validator.isTrimmed = function (input) {
        var leadingChar = input[0],
            inputLen = input.length,
            tempInputLen = inputLen,
            endingChar = input[--tempInputLen],
            ans = true;

        if ((leadingChar === ' ') || (endingChar === ' ')) {
            ans = false;
        }

        return ans;
    }

    // var input = '  name';
    // console.log(isTrimmed(input))
    // var input = 'name ';
    // console.log(isTrimmed(input))
    // var input = 'name';
    // console.log(isTrimmed(input))

    validator.contains = function (input, words) {
        var punctuationMarks = [".", ",", ";", ":", "?", "!", "'", '"'],
            ans = false;
        input = input.toLowerCase();

        input = removePunctuation(punctuationMarks, input)
        inputArr = input.split(" ");

        for (var i = 0; i < inputArr.length; i++) {
            for (var j = 0; j < words.length; j++) {
                var word = words[j].toLowerCase();
                if (inputArr[i] === word) {
                    // console.log('inside if ', inputArr[i], words[j])
                    ans = true;
                    break;
                }
            }

            if (ans) {
                break;
            }
        }

        return ans;
    }



    validator.lacks = function (input, words) {
        var punctuationMarks = [".", ",", ";", ":", "?", "!", "'", '"'],
            containsFlag = false,
            ans = false;
        input = input.toLowerCase();

        input = removePunctuation(punctuationMarks, input)
        inputArr = input.split(" ");

        for (var i = 0; i < inputArr.length; i++) {
            for (var j = 0; j < words.length; j++) {
                var word = words[j].toLowerCase();
                if (inputArr[i] === word) {
                    // console.log('inside if ', inputArr[i], words[j])
                    containsFlag = true;
                    break;
                }
            }

            if (containsFlag) {
                break;
            }
        }

        if (!containsFlag) {
            ans = true;
        }

        return ans;
    }


    validator.isComposedOf = function (input, strings) {
        var punctuationMarks = [".", ",", ";", ":", "?", "!", "'", '"'],
            input = removePunctuation(punctuationMarks, input),
            input = input.toLowerCase(),
            strings = strings.toString(),
            strings = removePunctuation(punctuationMarks, strings),
            strings = strings.toLowerCase(),
            ans = true;

        for (var i = 0; i < input.length; i++) {
            var letter = input[i];
            var idx = strings.indexOf(letter);
            if (idx === -1) {
                ans = false;
                break;
            }
        }
        // console.log(input, strings)
        return ans;
    }


    validator.isOfLengthOrLessThan = function (input, n) {
        return input.length <= n;
    }

    validator.isOfLengthOrGreaterThan = function (input, n) {
        return input.length >= n;
    }

    validator.lessWordsThan = function (input, n) {
        var punctuationMarks = [".", ",", ";", ":", "?", "!", "'", '"'];

        input = input.toLowerCase();
        input = removePunctuation(punctuationMarks, input);
        inputArr = input.split(" ");
        return inputArr.length <= n;

    }

    validator.moreWordsThan = function (input, n) {
        var punctuationMarks = [".", ",", ";", ":", "?", "!", "'", '"'];

        input = input.toLowerCase();
        input = removePunctuation(punctuationMarks, input);
        inputArr = input.split(" ");
        return inputArr.length >= n;

    }

    validator.isNumberBetween = function (input, floor, ceil) {
        return ((input <= ceil) && (input >= floor));
    }

    validator.isAlphanumeric = function (input) {
        input = input.toLowerCase();
        var ans = true;

        for (var i = 0; i < input.length; i++) {
            var element = input[i];
            // console.log('i', i)
            if (!(containsOnlyAlphabet(element) || containsOnlyNumbers(element))) {
                ans = false;
                break;
            }

        }

        return ans;
    }

    validator.isCreditCard = function (input) {
        //remove - if there
        var punctuationMarks = ["-"],
            ans = false;
        input = removePunctuation(punctuationMarks, input);
        console.log('input', input)

        //confirm it only contains numbers
        if (containsOnlyNumbers(input)) {
            if (input.length === 16) {
                ans = true;
            }
        }

        return ans;
    }

    validator.isHex = function (input) {
        var ans = false;
        if ((input.length === 7) || (input.length === 4)) {
            var firstLetter = input[0],
                otherLetters = input.substr(1);
            if (firstLetter === '#') {
                if (validator.isAlphanumeric(otherLetters)) {
                    ans = true;
                }
            }

        }

        return ans;
    }

    validator.isRGB = function (input) {
        input = removePunctuation('[" "]', input);
        var startsWith = input.substr(0, 4),
            inputLength = input.length,
            endsWith = input.substr((inputLength - 1)),
            ans = false;

        if ((startsWith === 'rgb(') && (endsWith === ')')) {
            input = input.substr(4)  //remove 'rgb('
            input = input.substr(0, (input.length - 1)) // remove ')'
            // console.log('input', input)

            inputArr = input.split(",");
            if (inputArr.length === 3) {
                for (var i = 0; i < inputArr.length; i++) {
                    var tempNum = parseInt(inputArr[i]);
                    console.log('tempNum', tempNum)
                    console.log(inputArr.toString())
                    if (!((tempNum >= 0) && (tempNum <= 255))) {
                        break;
                    } else if ((tempNum >= 0) && (tempNum <= 255) && (i === 2)) {
                        ans = true;
                    }
                }

            }

        }

        return ans;
    }


    validator.isHSL = function (input) {
        input = removePunctuation('[" "]', input);  //remove spaces
        var startsWith = input.substr(0, 4),    //get hsl(
            inputLength = input.length,
            endsWith = input.substr((inputLength - 1)), //get )
            ans = false;

        if ((startsWith === 'hsl(') && (endsWith === ')')) {
            input = input.substr(4)  //remove 'hsl('
            input = input.substr(0, (input.length - 1)) // remove ')'
            // console.log('input', input)

            inputArr = input.split(",");
            if (inputArr.length === 3) {
                for (var i = 0; i < inputArr.length; i++) {
                    var tempNum = parseInt(inputArr[i]);
                    // console.log('tempNum', tempNum)
                    // console.log(inputArr.toString())
                    // console.log('i', i)

                    //check if first num is btn 0 and 360
                    if (i === 0) {
                        if (!((tempNum >= 0) && (tempNum <= 360))) {
                            break;
                        }
                    }

                    //check if 2nd num is either 0 or 1
                    if (i === 1) {
                        if (!((tempNum >= 0) && (tempNum <= 1))) {
                            break;
                        }
                    }

                    //check if the last num is either 0 or 1. If it reaches this point and is valid, the its hsl
                    if (i === 2) {
                        if (((tempNum >= 0) && (tempNum <= 1))) {
                            ans = true;
                        }
                    }
                }
            }
        }

        return ans;
    }

    validator.isColor = function (input) {
        var ans = false;
        if (isHex(input) || isRGB(input) || isHSL(input)) {
            ans = true;
        }

        return ans;
    }

    // function containsOnlyAlphaNumeric(input) {
    //     input = input.toLowerCase();
    //     var ans = true;

    //     for (var i = 0; i < input.length; i++) {
    //         var element = input[i];
    //         // console.log('i', i)
    //         if (!(containsOnlyAlphabet(element) || containsOnlyNumbers(element))) {
    //             ans = false;
    //             break;
    //         }

    //     }

    //     return ans;
    // }

    function containsOnlyAlphabet(input) {
        input = input.toLowerCase();
        var ans = true;
        for (var i = 0; i < input.length; i++) {
            var element = input[i];
            if (!((element >= 'a') && (element <= 'z'))) {
                ans = false;
                break;
            }
        }

        return ans;
    }

    //helper function
    function removePunctuation(punctuation, input) {
        var tempInputLen,
            lengthChanged = false,
            punctuationValue = null,
            inputLen = input.length;

        for (var i = 0; i < punctuation.length; i++) {
            punctuationValue = punctuation[i];
            tempInputLen = inputLen;

            while (true) {
                input = input.replace(punctuationValue, "");
                if (input.length !== inputLen) {
                    lengthChanged = true;
                    inputLen = input.length;
                } else {
                    break;
                }
            }
        }

        return input;

    }

    return validator;

};


