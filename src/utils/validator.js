import { useFormik } from 'formik';
import { userSchema } from './validationSchema';

//validateUser = { handleChange, handleSubmit, values, errors }
export const ValidateUser = useFormik({
    initialValues: {
        fname: ""
        // lname: "",
        // role: "",
        // username: "",
        // password: "",
        // confirmPassword: ""
    },
    validationSchema: userSchema,
    onSubmit(values) {
        console.log('form submitted');
        // if(values.password === values.confirmPassword){
        //     alert("form submitted")
        // }else{
        //     alert("password are not matching")
        // }
    }
})

