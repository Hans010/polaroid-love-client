import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        // login the user
        history.push("/");
    } catch (err) {
        console.log(err);
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        // sign up the user
        history.push("/");
    } catch (err) {
        console.log(err);
    }
}