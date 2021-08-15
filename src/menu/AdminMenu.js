import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CategoryIcon from '@material-ui/icons/Category';
import PostAddIcon from '@material-ui/icons/PostAdd';
//import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core';
import userLogout from '../controllers/userLogout';
import Cookies from 'js-cookie';

const useStyles = makeStyles({
    root: {
        marginLeft: '5px',
        '& *': {
            color: 'white',
            textTransform: 'capitalize'
        }
    },
    active: {
        background: 'white',
        '& *': {
            color: 'black',
        }
    },
})

function AdminMenu({ isAuth }) {
    const classes = useStyles();
    const history = useHistory();
    const handleLogout = () => {
        userLogout(`/admin/logout/${Cookies.get('jwt')}`)
            .then((res) => {
                console.log("Logout sucessfull")
                isAuth(false);
                history.push('/')
            }).catch((err) => {
                history.push('/')
                console.log(err)
            })
    }

    const listItem = [
        { path: '/admin/dashboard', icon: <DashboardIcon />, text: 'dashboard' },
        { path: '/admin/users/1', icon: <PersonIcon />, text: 'users' },
        { path: '/admin/posts', icon: <PostAddIcon />, text: 'posts' },
        { path: '/admin/category', icon: <CategoryIcon />, text: 'category' },
        //{ path: '/admin/changepassword', icon: <LockIcon />, text: 'change password' },
    ]

    return (
        <div >
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
            <ListItem
                onClick={handleLogout}
                className={classes.root}
                component={NavLink}
                to='/admin/logout'
            >
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
            </ListItem>
        </div>
    )
}

export default AdminMenu
