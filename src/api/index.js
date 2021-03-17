import axios from 'axios';

// This will connect your app to your local server
// const serverUrl = 'http://localhost:5000';
// Change this to your server app location
const serverUrl = `https://mern-project-1-yh2ss.herokuapp.com`;

const API = axios.create({baseURL: serverUrl});

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`${'/posts'}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`);
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signIn', formData);
export const signUp = (formData) => API.post('/user/signUp', formData);