import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getPosts} from './actions/posts';
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/polaroid.jpeg';
import useStyles from './styles';

const App = (props) => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);

    return (
        <div>
            <Container maxWidth="lg">
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography className={classes.heading} variant="h2" align="center">Polaroid Love</Typography>
                    <img className={classes.image} src={memories} alt="memories" height="60"/>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch"
                              spacing={3}>
                            <Grid item xs={12} sm={7}>
                                <Posts setCurrentId={setCurrentId}/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </div>
    );
}

export default App;