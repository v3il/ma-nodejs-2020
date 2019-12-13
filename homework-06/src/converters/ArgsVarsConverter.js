const BaseConverter = require('./BaseConverter');

class ArgsVarsConverter extends BaseConverter {
    convertToBoolean(value) {
        // --some-key -> true
        if (!value.length) {
            return this.generateSuccessfulParsingResponse(true);
        }

        return super.convertToBoolean(value);
    }
}

module.exports = new ArgsVarsConverter();
