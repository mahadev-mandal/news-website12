import React, { useState } from 'react'
import propTypes from 'prop-types';
import { FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        
    }
}))

function SelectBox({errorText,onChange,value}) {
   console.log('sjdf'+value)
    console.log(errorText)
    const classes = useStyles();
    const [selectValue, setSelectValue] = useState('');

    const handleChange = (event) => {
        setSelectValue(event.target.value)
        onChange()
    }

    const selectBox = [{ label: 'User Role' }, { menuItem: ['admin', 'user'] }]

    return (
        <>
            <FormControl fullWidth variant='outlined' className={classes.formControl} >
                <InputLabel id='select-box' >{selectBox[0].label}</InputLabel>
                <Select
                    labelId='select-box'
                    label='User Role'
                    name='role'
                    value={selectValue}
                    onChange={handleChange}
                >
                    <MenuItem value=''><em>None</em></MenuItem>
                    {selectBox[1].menuItem.map((item) =>
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </>
    )
}

SelectBox.propTypes=({
 errorText:propTypes.string
})

export default SelectBox
