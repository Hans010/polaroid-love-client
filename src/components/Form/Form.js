import React, {useEffect, useState} from "react";
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import * as actions from "../../actions/posts";

import FileBase from "react-file-base64";
import useStyles from './styles';

const Form = ({currentId, setCurrentId}) => {
    const selectedPost = useSelector(state => currentId && state.posts.find(post => post._id === currentId));

    const initialState = {
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    };
    const [postData, setPostData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedPost) setPostData(selectedPost)
    }, [selectedPost]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(actions.updatePost(currentId, postData))
        } else {
        dispatch(actions.createPost(postData));
        }
        clear();
    };

    const clear = () => {
        setPostData(initialState);
        setCurrentId(null);
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
                           onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                           onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}
                           onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                           onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false}
                                                             onDone={({base64}) => setPostData({
                                                                 ...postData,
                                                                 selectedFile: base64
                                                             })}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit"
                        fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;