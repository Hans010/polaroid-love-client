import {actionTypes} from '../constants/actionTypes';

const authReducer = (state = {authData: null, errorMsg: null}, action) => {

    switch (action.type) {

        case actionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data, errorMsg: null};

        case actionTypes.LOGOUT:
            localStorage.clear();
            return {...state, authData: null, errorMsg: null};

        case actionTypes.BADAUTH:
            return {...state, authData: null, errorMsg: 'Invalid credentials'}

        case actionTypes.PASS_MISMATCH:
            return {...state, authData: null, errorMsg: 'Passwords do not match'}

        case actionTypes.USER_EXISTS:
            return {...state, authData: null, errorMsg: 'User already registered'}

        default:
            return state;
    }
}

export default authReducer;