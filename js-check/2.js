const user = {
    firstName: 'John', // string
    lastName: 'Doe', // string
    rate: 0.86, // number in range 0..1
    address: { // not empty object or null
        line1: '15 Macon St', // string
        line2: '', // string
        city: 'Gotham' // string
    },
    phoneNumbers: [ // array containing at least 1 element
        {
            type: 'MOBILE', // string, limited to MOBILE | LINE | VOIP
            number: '(555) 555-1234' // string in specific format
        },
        {
            type: 'LINE',
            number: '(555) 555-5678'
        }
    ]
};

const validationScheme = {
    firstName: isString,
    lastName: isString,
    rate: isNumberBetween0And1,
    address(data) {
        const isValidAddress = (isObject(data) && Object.keys(data).length > 0);

        if (isValidAddress) {
            const keysCountIsCorrect = Object.keys(data).length === 3;
            const allValuesAreStrings = Object.values(data).every(isString);
            const allRequestedKeysArePresent = ['line1', 'line2', 'city']
                .every(propertyName => data.hasOwnProperty(propertyName));

            return keysCountIsCorrect && allRequestedKeysArePresent && allValuesAreStrings;
        }

        return false;
    },
    phoneNumbers(data) {
        const isValidPhoneNumbers = Array.isArray(data) && data.length > 0;

        if (isValidPhoneNumbers) {
            return data.every((phoneNumberData) => {
                const isValidPhoneNumberData = (
                       isObject(phoneNumberData)
                    && Object.keys(phoneNumberData).length === 2
                    && ['type', 'number'].every(propertyName => phoneNumberData.hasOwnProperty(propertyName))
                );

                if (isValidPhoneNumberData) {
                    const { type, number } = phoneNumberData;

                    const isValidType = isString(type) && isValidPhoneNumberType(type);
                    const isValidNumber = isString(number) && isValidPhoneNumber(number);

                    return isValidType && isValidNumber;
                }

                return false;
            });
        }

        return false;
    }
};

function validateUser(user) {
    return Object.entries(validationScheme)
        .every(([propertyName, propertyValidator]) => propertyValidator(user[propertyName]));
}

module.exports = validateUser;

function isString(data) {
    return typeof data === 'string';
}

function isNumberBetween0And1(data) {
    return typeof data === 'number' && data >= 0 && data <= 1;
}

function isObject(data) {
    return typeof data === 'object' && data !== null;
}

function isValidPhoneNumberType(type) {
    return ['MOBILE', 'VOIP', 'LINE'].includes(type);
}

function isValidPhoneNumber(number) {
    return /^\(555\) 555-\d\d\d\d$/.test(number);
}