import React, { Component } from "react";
import Link from 'react-router-dom/Link';

//CSS
import './Navbar.css';

//Components
import SearchBar from './search bar/SearchBar'

//Material-UI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'

class Navbar extends Component{
    render(){
        return(
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    <SearchBar></SearchBar>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/authentication">Authentication</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;