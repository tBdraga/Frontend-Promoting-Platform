import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Theme
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//Components
import Navbar from './components/navbar/Navbar';
import AuthRoute from './components/authroute/AuthRoute';

//Pages
import Home from './home/Home'
import Login from './login/Login'
import Signup from './signup/Signup'

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

let authenticated;

const token = localStorage.userJwt;

if (token) {
  const decodedToken = jwtDecode(token.split(" ")[1]);

  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
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
                <AuthRoute exact path="/login" component={Login} authenticated={authenticated}></AuthRoute>
                <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated}></AuthRoute>
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
