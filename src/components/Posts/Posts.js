import React from "react";
import {Grid, CircularProgress,} from "@material-ui/core";
import Post from "./Post/Post";
import {useSelector} from "react-redux";
import useStyles from './styles';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


const Posts = ({setCurrentId}) => {
    dotenv.config();
    const posts = useSelector((state) => state.posts)
    const classes = useStyles();
    let userId = undefined;
    let tokenExpire = undefined;
    const user = JSON.parse(localStorage.getItem('profile'));
    if (user) {
        const decodedToken = jwt.decode(user?.token, process.env.SECRET_TOKEN);
        userId = decodedToken.sub ?? decodedToken.id;
        tokenExpire = decodedToken.exp;
    }


    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} isThisYourPost={userId === post?.creator} tokenExpire={tokenExpire}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;