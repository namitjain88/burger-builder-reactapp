import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userId: null,
    idToken: null,
    error: null,
    loading: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        default: return state;
    }
}

const authStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        userId: action.userId,
        idToken: action.idToken,
        loading: false,
        error: null
    };
};

const authFailed = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    };
};

export default reducer;