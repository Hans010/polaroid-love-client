import {actionTypes} from '../constants/actionTypes';
import * as api from '../api';

export const signIn = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData);

        console.log(data);
        dispatch({type: actionTypes.AUTH, data})

        history.push("/");
    } catch (err) {
        console.log(err);
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    try {
       const {data} = await api.signUp(formData);
       dispatch({type: actionTypes.AUTH, data});
        history.push("/");
    } catch (err) {
        console.log(err);
    }
}