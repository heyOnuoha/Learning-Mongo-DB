const assert = require('assert');
const User = require('../src/user');

describe('Validates records', () => {

    it('requires a user\'s name', () => {

        const user = new User({ name: undefined });

        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name is required');
    });

    it('requires a user\'s name longer than 2 characters', () => {

        const user = new User({name: 'Al'});
        
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters');
    });

    it('disallows invalid input from being saved', done => {

        const user = new User({ name: 'Al' });
        user.save()
            .catch(reason => {

                const { message } = reason.errors.name;
                assert(message === 'Name must be longer than 2 characters');

                done();
            });
    });
});