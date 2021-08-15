import React, { useEffect, useState } from 'react'
import { Button, TextareaAutosize } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'
import editData from '../../../controllers/editData'
import { useHistory, useParams } from 'react-router-dom';
import fetchPostToEdit from '../../../controllers/fetchPostToEdit';

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

    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState({});
    const [fileError, setFileError] = useState('');
    const [post, setPost] = useState({ title: '', author: '', category: '', about: '' });

    useEffect(() => {
        fetchPostToEdit(`/post/${id}`)
            .then((post) => {
                setPost(post)
            }).catch((err) => {
                console.log(err);
            })
    }, [id])

    //validating file/image
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

    const handleSubmit = () => {
        if (fileError === '') {
            const formData = new FormData();
            formData.append('title', post.title);
            formData.append('category', post.category);
            formData.append('author', post.author);
            formData.append('file', selectedFile);
            formData.append('about', post.about);
            editData(`/updatepost/${id}`, formData)
                .then((res) => {
                    history.push('/admin/posts')
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    const categories = ['sports', 'entertainments', 'local', 'business', 'science', 'culture'];

    return (
        <>

            <label htmlFor="" className={classes.label}>TITTLE</label>
            <TextareaAutosize rows='3'
                className={classes.textarea}
                onChange={(event) => { setPost({ ...post, title: event.target.value }) }}
                value={post.title}
            >
            </TextareaAutosize>
            <FormControl fullWidth variant='outlined' className={classes.formControl} >
                <InputLabel id='select-box' >Category</InputLabel>
                <Select
                    labelId='select-box'
                    label='Category'
                    onChange={(event) => { setPost({ ...post, category: event.target.value }) }}
                    value={`sports`}
                >
                    <MenuItem value=''><em>None</em></MenuItem>
                    {categories.map((category) =>
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <TextField
                className={classes.textField}
                fullWidth
                label="Author"
                variant="outlined"
                onChange={(event) => { setPost({ ...post, author: event.target.value }) }}
                value={post.author}
            />
            <TextField
                type='file'
                variant='outlined'
                fullWidth
                inputProps={{ accept: "image/jpg,image/png,image/jpeg" }}
                onChange={handleChangeFile}
                error={fileError ? true : false}
                helperText={fileError ? fileError : null}
            />
            <label htmlFor="" className={classes.label}>About Post</label>
            <textarea rows='30'
                style={{whiteSpace:'pre-wrap'}}
                name='about'
                className={classes.textarea}
                onChange={(event) => { setPost({ ...post, about: event.target.value }) }}
                value={post.about}
            >
            </textarea>
            <Button variant='outlined' onClick={handleSubmit}>Submit</Button>

        </>
    )
}

export default AddPost
