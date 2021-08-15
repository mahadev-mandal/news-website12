import React, { useState } from 'react';
import editData from '../../../controllers/editData';
import { useFormik } from 'formik';
import { userSchema } from '../../../utils/validationSchema';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { Box } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    box: {
        marginBottom: theme.spacing(2)
    }

}))

function EditUserDialog({ isOpen, dialogClose, handleFetchData, user }) {

    const classes = useStyles();
    const [error, setError] = useState("");

    const handleClose = () => {
        dialogClose();
    }

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            fname: user.fname,
            lname: user.lname,
            role: user.role,
            username: user.user_name,
            password: '',
            confirmPassword: ''
        },
        validationSchema: userSchema,
        onSubmit(values) {
            if (values.password === values.confirmPassword) {
                editData(`/updateuser/${user.user_name}`, values)
                    .then((res) => {
                        console.log('user updated successfully')
                        handleFetchData()
                        dialogClose();
                    }).catch((err) => {
                        console.log("username already exists");
                        setError("Username already exists")
                    })
            } else {
                setError("Passwords are not matching");
            }
        }
    })

    const textField = [
        { type: 'text', label: 'first name', name: 'fname' },
        { type: 'text', label: 'last name', name: 'lname' },
        { type: 'text', label: 'username', name: 'username' },
        { type: 'password', label: 'change password', name: 'password' },
        { type: 'password', label: 'confirm password', name: 'confirmPassword' }
    ]

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClick={e => setError('')}
            >
                <DialogTitle id="alert-dialog-title">
                    {` Edit user `}
                </DialogTitle>
                <DialogContent>
                    <Box className={classes.box} >
                        <FormControl fullWidth variant='outlined' className={classes.formControl} >
                            <InputLabel id='select-box' >User role</InputLabel>
                            <Select
                                labelId='select-box'
                                label='User Role'
                                name='role'
                                value={values.role}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.role && touched.role ?
                                    true : false}
                            >
                                <MenuItem value=''><em>None</em></MenuItem>
                                <MenuItem value='admin'>Admin</MenuItem>
                                <MenuItem value='user'>User</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {textField.map((attrValue) =>
                        <Box key={attrValue.name} className={classes.box} >
                            <TextField
                                fullWidth
                                type={attrValue.type}
                                label={attrValue.label}
                                variant='outlined'
                                name={attrValue.name}
                                autoComplete='off'
                                value={values[attrValue.name]}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors[attrValue.name] && touched[attrValue.name] ?
                                    true : false}
                                helperText={errors[attrValue.name] && touched[attrValue.name] ?
                                    errors[attrValue.name] : null}
                            />
                        </Box>
                    )}
                    <div style={{ color: 'red' }}>{error}</div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary" >
                        Update user
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    )
}

export default EditUserDialog
