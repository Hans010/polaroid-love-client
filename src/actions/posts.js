import * as api from '../api';
import {actionTypes} from '../constants/actionTypes';

// Action Creators

export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        dispatch({type:actionTypes.FETCH_ALL, payload: data});
    } catch (err) {
        console.log(err)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        dispatch({type:actionTypes.CREATE, payload: data})
    } catch (err) {
        console.log(err);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({type: actionTypes.UPDATE, payload: data})
    } catch (err) {
        console.log(err);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type:actionTypes.DELETE, payload: id});
    } catch (err) {
        console.log(err);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type:actionTypes.LIKE, payload: data});
    } catch (err) {
        console.log(err);
    }
}