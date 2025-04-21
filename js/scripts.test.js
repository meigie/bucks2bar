
describe('Username Validation Regex', () => {
    test('should validate a username with at least 1 capital letter, 1 special character, 1 number, and at least 8 characters', () => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

        expect(regex.test('Password1!')).toBe(true); // Valid username
        expect(regex.test('Invalid')).toBe(false); // Missing number and special character
        expect(regex.test('valid1@')).toBe(false); // Missing capital letter
        expect(regex.test('VALID1@')).toBe(false); // Missing lowercase letter
        expect(regex.test('Valid@')).toBe(false); // Less than 8 characters
        expect(regex.test('Valid123')).toBe(false); // Missing special character
    });

    describe('Username Validation Regex', () => {
        test('should validate a username with at least 1 capital letter, 1 special character, 1 number, and at least 8 characters', () => {
            const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*~])[A-Za-z0-9!@#$%^&*~]{8,}$/;

            expect(regex.test('Password1!')).toBe(true); // Valid username
            expect(regex.test('Invalid')).toBe(false); // Missing number and special character
            expect(regex.test('valid1@')).toBe(false); // Missing capital letter
            expect(regex.test('VALID1@')).toBe(false); // Missing lowercase letter
            expect(regex.test('Valid@')).toBe(false); // Less than 8 characters
            expect(regex.test('Valid123')).toBe(false); // Missing special character
        });
    });
});