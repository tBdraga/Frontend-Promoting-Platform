import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//Theme
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//Components
import Navbar from './components/navbar/Navbar';
import AuthRoute from './components/authroute/AuthRoute';

//Pages
import Home from './home/Home';
import Login from './login/Login';
import Signup from './signup/Signup';
import EditProfile from './edit profile/EditProfile';
import Dashboard from './components/dashboard/Dashboard';
import SearchResultsPage from './search results/SearchResultsPage';
import DashboardAdmin from './dashboard admin/DashboardAdmin';
import InspectOtherProfile from './inspect other profile/InspectOtherProfile';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const token = localStorage.userJwt;

if (token) {
  const decodedToken = jwtDecode(token.split(" ")[1]);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    
    //reinitialize axios default headers, tey get deleted after refresh
    axios.defaults.headers.common['Authorization'] = token;
    
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar></Navbar>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} ></Route>
              <AuthRoute exact path="/login" component={Login} ></AuthRoute>
              <AuthRoute exact path="/signup" component={Signup} ></AuthRoute>
              <Route exact path="/editProfile" component={EditProfile} ></Route>
              <Route exact path="/searchResult" component={SearchResultsPage} ></Route>
              <Route exact path="/dashboard" component={Dashboard} ></Route>
              <Route exact path="/adminDash" component={DashboardAdmin}></Route>
              <Route exact path="/profile/:idUser" component={InspectOtherProfile}></Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
