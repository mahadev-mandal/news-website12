import React from 'react';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';

function TextFieldCom(value, type, name, errorMessage, label, onChange) {

    const handleChange = () => {
        //const {value} = event.target;
        onChange(value);

    }

    return (
        <div>
            <TextField
                type={type}
                value={value}
                name={name}
                label={label}
                variant='outlined'
                onChange={handleChange}
                helperText={errorMessage}
            />
        </div>
    )
}

TextFieldCom.propTypes = {
    value: propTypes.string,
    type: propTypes.string,
    label: propTypes.string,
    onChange: propTypes.func.isRequired
};

TextFieldCom.defaultProps = {
    value: '',
    type: '',
    label: '',
    errorMessage: null,
};

export default TextFieldCom
