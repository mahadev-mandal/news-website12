import React, { useState } from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import LoginPage from '../components/admin/LoginPage/LoginPage'
import Home from '../containers/Home/Home'
import ReadNews from '../containers/ReadNews/ReadNews'
import Error404 from '../containers/Error404/Error404'
import Admin from '../containers/Admin/Admin'
import Dashboard from '../components/admin/Dashboard/Dashboard'
import Users from '../components/admin/Users/Users'
import Category from '../components/admin/Category/Category'
import Post from '../components/admin/Posts/Posts'
import AddPost from '../components/admin/AddPost/AddPost'
import EditPost from '../components/admin/EditPost/EditPost';
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar/Navbar'
import Categ from '../containers/Categ/Categ'
import AboutUs from '../containers/AboutUs/AboutUs'
import ContactUs from '../containers/ContactUs/ContactUs'


function ClientRouter() {
    const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get('jwt') ? true : false)
    const isAuth = (value) => {
        if (value) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'
                    component={() => <Navbar comp={< Home />} />}
                />
                <Route exact path='/category'
                    component={() => <Navbar comp={< Categ />} />}
                />
                <Route exact path='/aboutus'
                    component={() => <Navbar comp={< AboutUs />} />}
                />
                <Route exact path='/contactus'
                    component={() => <Navbar comp={< ContactUs />} />}
                />
                <Route exact path='/admin'
                    component={() => !isAuthenticated ? <LoginPage isAuth={isAuth} />
                        : <Redirect to='/admin/dashboard' />}
                />
                <Route exact path='/admin/dashboard'
                    component={() => isAuthenticated ? <Admin isAuth={isAuth} comp={<Dashboard />} />
                        : <Redirect to='/admin' />}
                />
                <Route exact path='/admin/users/:pageno'
                    component={() => isAuthenticated ? <Admin comp={<Users />} />
                        : <Redirect to='/admin' />}
                />
                <Route exact path='/admin/posts'
                    component={() => isAuthenticated ? <Admin comp={<Post />} />
                        : <Redirect to='/admin' />}
                />
                <Route exact path='/admin/category'
                    component={() => isAuthenticated ? <Admin comp={<Category />} />
                        : <Redirect to='/admin' />}
                />
                <Route exact path='/admin/addpost'
                    component={() => isAuthenticated ? <Admin comp={<AddPost />} />
                        : <Redirect to='/admin' />}
                />
                <Route exact path='/admin/editpost/:id'
                    component={() => isAuthenticated ? <Admin comp={<EditPost />} />
                        : <Redirect to='/admin' />}
                />
                <Route exact path='/:category/:id'
                    component={() => <Navbar comp={<ReadNews />} />}
                />
                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
    )
}

export default ClientRouter
