import React, {useEffect, useState} from "react";
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import * as actions from "../../actions/posts";

import FileBase from "react-file-base64";
import useStyles from './styles';

const Form = ({currentId, setCurrentId}) => {
    const selectedPost = useSelector(state => currentId && state.posts.find(post => post._id === currentId));

    const initialState = {
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    };
    const [postData, setPostData] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (selectedPost) setPostData(selectedPost)
    }, [selectedPost]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(actions.updatePost(currentId, postData))
        } else {
            dispatch(actions.createPost({...postData, name: user?.result?.name}));
        }
        clear();
    };

    const clear = () => {
        setPostData(initialState);
        setCurrentId(null);
    };

    return (
        <Paper className={classes.paper}>
            <Typography className={classes.marginTop20} variant="h6">{currentId ? 'Editing' : 'Creating'} a Polaroid
                moment</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} ${classes.marginTop20}`}
                  onSubmit={handleSubmit}>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                           onChange={(e) => setPostData({...postData, title: e.target.value})}
                           disabled={!user?.result?.name}/>
                <TextField name="message" variant="outlined" label="Message" multiline rows={4} fullWidth value={postData.message}
                           onChange={(e) => setPostData({...postData, message: e.target.value})}
                           disabled={!user?.result?.name}/>
                <TextField name="tags" variant="outlined" label="Tags (commas,between,tags)" fullWidth value={postData.tags}
                           onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                           disabled={!user?.result?.name}/>

                {user?.result?.name &&
                <div className={classes.fileInput}><FileBase type="file" multiple={false}
                                                             onDone={({base64}) => setPostData({
                                                                 ...postData,
                                                                 selectedFile: base64
                                                             })}/>
                </div>
                }
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit"
                        fullWidth disabled={!user?.result?.name}>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth
                        disabled={!user?.result?.name}>Clear</Button>
            </form>
            <br/>
            {!user?.result?.name &&
            <div className={classes.marginTop20}>
                <Typography variant="h6" align="center">
                    Please sign in to create new polaroids
                </Typography>
            </div>
            }
        </Paper>
    );
}

export default Form;