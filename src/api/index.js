import axios from 'axios';

// This will connect your app to your local server
const serverUrl = 'http://localhost:5000/posts';

// Change this to your server app location
// const serverUrl = `https://mern-project-1-yh2ss.herokuapp.com/posts`;

export const fetchPosts = () => axios.get(serverUrl);
export const createPost = (newPost) => axios.post(serverUrl, newPost)
export const updatePost = (id, updatedPost) => axios.patch(`${serverUrl}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${serverUrl}/${id}`);
export const likePost = (id) => axios.patch(`${serverUrl}/${id}/likePost`);