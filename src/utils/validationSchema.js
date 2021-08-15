import * as yup from 'yup';

export const userSchema = yup.object().shape({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    role: yup.string().required("User role is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(5),
    confirmPassword: yup.string().required("Confirm password is required")

});

export const postSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    category: yup.string().required('Category is required'),
    author: yup.string().required('Author is required'),
    about: yup.string().required('This field is required')
})

export const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
})