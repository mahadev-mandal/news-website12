import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { makeStyles } from '@material-ui/styles';
import { ListItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        marginLeft: '5px',
        '& *': {
            textTransform: 'capitalize',
            color:'white'
        }
    },
    active: {
        background:'white',
        '& *': {
            color: 'black',
        }
    },
})

function ClientMenu() {

    const classes = useStyles();

    const listItem = [
        { text: 'home', path: '/', icon: <HomeIcon /> },
        { text: 'category', path: '/category', icon: <CategoryIcon /> },
        { text: 'about us', path: '/aboutus', icon: <InfoIcon /> },
        { text: 'contact us', path: '/contactus', icon: <ContactMailIcon /> },
    ]

    return (
        <div>
            {listItem.map((li) =>
                <ListItem
                    key={li.text}
                    className={classes.root}
                    component={NavLink}
                    exact to={li.path}
                    activeClassName={classes.active}
                >
                    <ListItemIcon >
                        {li.icon}
                    </ListItemIcon>
                    <ListItemText primary={li.text} />
                </ListItem>
            )}
        </div>
    )
}

export default ClientMenu
