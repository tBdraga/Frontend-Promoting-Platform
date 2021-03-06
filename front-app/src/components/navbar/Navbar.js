import React, { Component } from "react";
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';

//CSS
import './Navbar.css';

//Components
import SearchBar from './search bar/SearchBar'
import CreatePost from '../create post/CreatePost';
import Recommender from '../recommender/Recommender';

//Material-UI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
import { Grid, IconButton, Icon } from "@material-ui/core";

class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {

        const { classes, user: { userRole, loading, authenticated } } = this.props;

        let navbarMarkup = !loading ? (authenticated ? ( userRole ==='ADMIN' ? (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    <SearchBar></SearchBar>
                    <CreatePost></CreatePost>
                    <Recommender startCount='15'></Recommender>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/adminDash">Admin Dashboard</Button>
                    <Button color="inherit" component={Link} to="/editProfile">Profile Settings</Button>
                    <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        ) : (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    <SearchBar></SearchBar>
                    <CreatePost></CreatePost>
                    <Recommender startCount='15'></Recommender>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/editProfile">Profile Settings</Button>
                    <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        )
        ) : (
                <AppBar position="fixed">
                    <Toolbar className="nav-container">
                        <SearchBar></SearchBar>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Register</Button>
                    </Toolbar>
                </AppBar>
            )) : (<p>loading...</p>)

        return navbarMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToPros = { logoutUser };

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToPros)(Navbar);