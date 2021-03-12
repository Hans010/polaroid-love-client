import React, {useState} from "react";
import {Avatar, Button, Container, Grid, Icon, Paper, Typography} from "@material-ui/core";
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from "react-redux";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from "./Input";
import IconGoogle from './IconGoogle';

import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword((prevShowPassword => !prevShowPassword));

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {

    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: 'AUTH', data: {result, token}});
        } catch (err) {
            console.log(err);
        }
    }
    const googleFailure = (err) => {
        console.log('Google Sign in was unsuccessful. Try again later', err);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Enter password" handleChange={handleChange}
                               type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        {isSignUp &&
                        <Input name="confirmPassword" label="Please confirm password" handleChange={handleChange()}
                               type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="1013882050070-p1f2fkudiiehigimb6irihk7ip2r30ed.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<IconGoogle/>}
                                variant="contained">Google sign in</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button
                                onClick={switchMode}>{isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;