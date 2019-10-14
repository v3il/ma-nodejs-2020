const validateUser = require('../2');

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

let userClone = null;

beforeEach(() => {
    userClone = { ...user };
});

describe('2.js', () => {
    it('validates the "firstName" property correctly', () => {
        userClone.firstName = null;
        expect(validateUser(userClone)).toBe(false);

        userClone.firstName = undefined;
        expect(validateUser(userClone)).toBe(false);

        userClone.firstName = false;
        expect(validateUser(userClone)).toBe(false);

        userClone.firstName = {};
        expect(validateUser(userClone)).toBe(false);

        userClone.firstName = '';
        expect(validateUser(userClone)).toBe(true);

        userClone.firstName = 'blah';
        expect(validateUser(userClone)).toBe(true);
    });

    it('validates the "lastName" property correctly', () => {
        userClone.lastName = null;
        expect(validateUser(userClone)).toBe(false);

        userClone.lastName = undefined;
        expect(validateUser(userClone)).toBe(false);

        userClone.lastName = false;
        expect(validateUser(userClone)).toBe(false);

        userClone.lastName = {};
        expect(validateUser(userClone)).toBe(false);

        userClone.lastName = '';
        expect(validateUser(userClone)).toBe(true);

        userClone.lastName = 'blah';
        expect(validateUser(userClone)).toBe(true);
    });

    it('validates the "rate" property correctly', () => {
        userClone.rate = null;
        expect(validateUser(userClone)).toBe(false);

        userClone.rate = undefined;
        expect(validateUser(userClone)).toBe(false);

        userClone.rate = false;
        expect(validateUser(userClone)).toBe(false);

        userClone.rate = {};
        expect(validateUser(userClone)).toBe(false);

        userClone.rate = '';
        expect(validateUser(userClone)).toBe(false);

        userClone.rate = 0;
        expect(validateUser(userClone)).toBe(true);

        userClone.rate = 1;
        expect(validateUser(userClone)).toBe(true);

        userClone.rate = 0.5;
        expect(validateUser(userClone)).toBe(true);
    });

    it('validates the "address" property correctly', () => {
        userClone.address = null;
        expect(validateUser(userClone)).toBe(false);

        userClone.address = {};
        expect(validateUser(userClone)).toBe(false);

        userClone.address = undefined;
        expect(validateUser(userClone)).toBe(false);

        userClone.address = '';
        expect(validateUser(userClone)).toBe(false);

        userClone.address = 50;
        expect(validateUser(userClone)).toBe(false);

        userClone.address = {
            line1: 123,
            line2: null,
            city: 'Gotham'
        };
        expect(validateUser(userClone)).toBe(false);

        userClone.address = {
            line1: 'test',
            city: 'Gotham'
        };
        expect(validateUser(userClone)).toBe(false);

        userClone.address = {
            line1: 'test',
            line2: 'test',
            city: 'Gotham'
        };
        expect(validateUser(userClone)).toBe(true);
    });

    it('validates the "phoneNumbers" property correctly', () => {
        userClone.phoneNumbers = null;
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = undefined;
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = '';
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = 123;
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = {};
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [1, 2];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [null, undefined];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = ['', false];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{}, []];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{}];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{ foo: 123 }];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{ type: 123, number: 123 }];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{ type: 'type', number: 'number' }];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{ type: 'VOIP', number: 'number' }];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{ type: 'type', number: '(555) 555-1234' }];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{ type: 'LINE', number: '(555) 555-aaaa' }];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{ type: 'LINE', number: '(000) 111-aaaa' }];
        expect(validateUser(userClone)).toBe(false);

        userClone.phoneNumbers = [{ type: 'MOBILE', number: '(555) 555-1234' }];
        expect(validateUser(userClone)).toBe(true);

        userClone.phoneNumbers = [{ type: 'VOIP', number: '(555) 555-0000' }];
        expect(validateUser(userClone)).toBe(true);

        userClone.phoneNumbers = [{ type: 'LINE', number: '(555) 555-9876' }];
        expect(validateUser(userClone)).toBe(true);
    });
});