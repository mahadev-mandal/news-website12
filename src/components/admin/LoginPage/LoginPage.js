import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loginSchema } from '../../../utils/validationSchema';
import userLogin from '../../../controllers/userLogin';
import { Avatar, Typography } from '@material-ui/core'
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '30px',
        margin: 'auto',
        marginTop: '40px',
        display: 'flex',
        justifyContent: 'center',
        background: 'rgba(255,228,255,.5)'
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: 'auto',
        background: blue[900]
    },
    userIcon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    }
}))


function LoginPage({ isAuth }) {

    const history = useHistory()
    const classes = useStyles();
    const [error, setError] = useState('')


    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit(values) {
            userLogin('/admin/login', values)
                .then((res) => {
                    isAuth(true)
                    history.push('/admin/dashboard');
                    console.log("loggin sucessfull")
                }).catch((err) => {
                    setError("Username or Password is not matching")
                    console.log("Login failed")
                })
        }
    })

    return (
        <div>
            <Grid container  >
                <Grid item
                    component={Paper}
                    elevation={5}
                    className={classes.root}
                    sm={5} md={3} xs={10}
                >
                    <form noValidate autoComplete="off">
                        <Avatar className={classes.avatar}>
                            <PersonIcon className={classes.userIcon} />
                        </Avatar> <br />
                        <TextField
                            label='Username'
                            id='username'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            error={errors.username && touched.username ? true : false}
                            helperText={errors.username && touched.username ? errors.username : null}
                        /> <br /><br />
                        <TextField
                            type='password'
                            label='Password'
                            id='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={errors.password && touched.password ? true : false}
                            helperText={errors.password && touched.password ? errors.password : null}
                        /> <br /><br />
                        <Typography variant='subtitle2'
                            style={{ color: 'red', marginBottom: 15 }}
                        >
                            {error}
                        </Typography>
                        <Button fullWidth
                            onClick={handleSubmit}
                            color='secondary'
                            variant='contained'
                        >
                            Login
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginPage
