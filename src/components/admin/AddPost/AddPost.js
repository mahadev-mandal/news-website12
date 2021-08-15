import React, { useState } from 'react'
import { postSchema } from '../../../utils/validationSchema';
import { useFormik } from 'formik';
import { Button, TextareaAutosize } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'
import addData from '../../../controllers/addData';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    textarea: {
        width: '100%',
    },
    label: {
        marginTop: 100
    },
    formControl: {
        marginTop: 5,
        marginBottom: 8
    },
    textField: {
        marginBottom: 8
    },
    error: {
        color: 'red',
        marginBottom: 10
    }
}))

function AddPost() {

    const history = useHistory()
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState({})
    const [fileError, setFileError] = useState('')

    //validating file 
    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (!(file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg')) {
            setFileError("Unsupported file format");
        } else if (file.size > 2 * 1024 * 1024) {
            setFileError("File size must be less than 2MB");
        } else {
            setFileError('')
        }
    }

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            title: '',
            category: '',
            author: '',
            image: null,
            about: ''

        },
        validationSchema: postSchema,
        onSubmit(values) {
            if (fileError === '') {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('category', values.category);
                formData.append('author', values.author);
                formData.append('file', selectedFile);
                formData.append('about', values.about);
                addData('/addpost', formData)
                    .then((res) => {
                        history.push('/admin/posts')
                    }).catch((err) => {
                        console.log(err);
                    })
            }
        }
    })

    const categories = ['sports', 'entertainments', 'local', 'business', 'science', 'culture'];
    
    return (
        <>
            <label htmlFor="" className={classes.label}>TITTLE</label>
            <TextareaAutosize rows='3'
                name='title'
                className={classes.textarea}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
            >
            </TextareaAutosize>
            <div className={classes.error} >
                {errors.title && touched.title ? errors.title : null}
            </div>
            <FormControl fullWidth variant='outlined' className={classes.formControl} >
                <InputLabel id='select-box' >Category</InputLabel>
                <Select
                    labelId='select-box'
                    label='Category'
                    name='category'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                // onBlur={handleBlur}
                >
                    <MenuItem value=''><em>None</em></MenuItem>
                    {categories.map((category) =>
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <div className={classes.error} >
                {errors.category && touched.category ? errors.category : null}
            </div>
            <TextField
                className={classes.textField}
                fullWidth
                id='author'
                name='author'
                label="Author"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.author}
            />
            <div className={classes.error} >
                {errors.author && touched.author ? errors.author : null}
            </div>
            <TextField
                type='file'
                name='image'
                variant='outlined'
                fullWidth
                inputProps={{ accept: "image/jpg,image/png,image/jpeg" }}
                onChange={handleChangeFile}
                error={fileError ? true : false}
                helperText={fileError ? fileError : null}
            />
            <label htmlFor="" className={classes.label}>About Post</label>
            <textarea rows='30'
                name='about'
                className={classes.textarea}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.about}
            >
            </textarea>
            <div className={classes.error} >
                {errors.about && touched.about ? errors.about : null}
            </div>
            <Button variant='outlined' onClick={handleSubmit}>Submit</Button>

        </>
    )
}

export default AddPost
