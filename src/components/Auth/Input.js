import React from 'react';
import {TextField, Grid, InputAdornment, IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const Input = ({half, name, handleChange, label, type, autoFocus, handleShowPassword}) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
    name={name}
    onChange={handleChange}
    required
    variant="outlined"
    fullWidth
    label={label}
    autoFocus={autoFocus}
    type={type}
    InputProps={(name === 'password') ? {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        )
    } : null}
    />
    </Grid>
);

export default Input;