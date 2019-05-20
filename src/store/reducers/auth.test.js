import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer testing', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            userId: null,
            token: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should set token & user id if log in successful', () => {
        expect(reducer({
            userId: null,
            token: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
                type: actionTypes.AUTH_SUCCESS,
                token: 'some-token',
                userId: 'some-userid'
            })).toEqual({
                userId: 'some-userid',
                token: 'some-token',
                error: null,
                loading: false,
                authRedirectPath: '/'
            });
    });
});