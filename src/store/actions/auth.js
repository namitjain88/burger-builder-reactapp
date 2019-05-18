import * as actionTypes from './actionTypes';
import axios from '../../axios.orders';
import * as appConfig from '../../app.config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const checkAuthTimeOut = (expirationInSecs) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationInSecs * 1000);
    }
}

export const authLogout = () => {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + appConfig.FIREBASE_API_KEY;
        if (isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + appConfig.FIREBASE_API_KEY;
        }
        axios.post(url,
            authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailed(err.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token !== null && expirationDate > new Date()) {
            dispatch(authSuccess(userId, token));
            dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            dispatch(authLogout());
        }
    }
}