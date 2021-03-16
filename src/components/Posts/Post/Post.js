import React from "react";
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";
import {useHistory} from "react-router-dom";

const Post = ({post, setCurrentId, isThisYourPost, tokenExpire}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const checkToken = () => {
        return tokenExpire * 1000 < new Date().getTime();
    }
    const logout = () => {
        dispatch({type: 'LOGOUT'});
        history.push("/");
    }


    const handleDelete = id => {
        if (checkToken()) return logout();
        dispatch(deletePost(id));
    }

    const handleLike = id => {
        if (checkToken()) return logout();
        dispatch(likePost(id));
    }

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {isThisYourPost && (
                <div className={classes.overlay2}>
                    <Button
                        style={{color: 'white',}}
                        size="small"
                        onClick={() => {
                            setCurrentId(post._id)
                        }}>
                        <MoreHorizIcon fontSize="default"/>
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag => (`#${tag} `))}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {
                    handleLike(post._id)
                }}>
                    <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; &nbsp;
                    {post.likes.length}
                </Button>
                {
                    isThisYourPost && (
                        <Button size="small" color="primary" onClick={() => {
                            handleDelete(post._id)
                        }}>
                            <DeleteIcon fontSize="small"/>
                            Delete
                        </Button>
                    )
                }

            </CardActions>
        </Card>
    )
};

export default Post;