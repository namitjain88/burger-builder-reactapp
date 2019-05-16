import * as actionTypes from '../actions/actionTypes';
import { authStart, authSuccess, authFailed } from '../actions/auth';

const initialState = {
    authen
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart();
        case actionTypes.AUTH_SUCCESS: return authSuccess();
        case actionTypes.AUTH_FAILED: return authFailed();
        default: return state;
    }
}

const authStart = () => {
    return {
        ...state
    };
};

const authSuccess = () => {
    return {
        ...state
    };
};

const authFailed = () => {
    return {
        ...state
    };
};