import {actionTypes} from '../constants/actionTypes';
import * as api from '../api';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const response = await api.signIn(formData);
        const data = response.data;
        dispatch({type: actionTypes.AUTH, data})
        history.push("/");
    } catch (err) {
        console.log(err);
        dispatch({type: actionTypes.BAD_AUTH});
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
        const response = await api.signUp(formData);
        const data = response.data;
        dispatch({type: actionTypes.AUTH, data});
        history.push("/");
    } catch (err) {
        console.log(err);
        dispatch({type: actionTypes.USER_EXISTS});
    }
}

