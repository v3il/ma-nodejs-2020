const BaseConverter = require('./BaseConverter');

class ArgsVarsConverter extends BaseConverter {
    convertToBoolean(value) {
        // --some-key (without value) should be converted to `true`
        if (!value.length) {
            return { parsed: true, parsedValue: true };
        }

        return super.convertToBoolean(value);
    }
}

module.exports = ArgsVarsConverter;
