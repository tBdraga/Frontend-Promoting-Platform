import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/authenticate', userData)
        .then(result => {

            setAuthorizationHeader(result.data.jwtToken);

            dispatch(getUserData());

            dispatch({ type: CLEAR_ERRORS });

            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/register', newUserData)
        .then(result => {

            setAuthorizationHeader(result.data.jwtToken);

            dispatch(getUserData());

            dispatch({ type: CLEAR_ERRORS });

            history.push('/');
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userJwt');

    //delete authorization header from axios
    delete axios.defaults.headers.common['Authorization'];

    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {

    dispatch({ type: LOADING_USER });

    const url = '/users/findByUsername/' + jwtDecode(localStorage.userJwt.split(" ")[1]).sub;

    axios.get(url)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
};

export const changeProfilePicture = (profilePicture, idUser) => (dispatch) => {
    dispatch({ type: LOADING_USER });

    const url = '/users/changeProfilePicture/' + idUser;

    axios.post(url, profilePicture)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
}

export const editUserDetails = (userDetails, idUser) => (dispatch) => {
    dispatch({ type: LOADING_USER });

    const url = '/users/updateUserDetails/' + idUser;

    axios.post(url, userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
    const jwtToken = `Bearer ${token}`;

    localStorage.setItem('userJwt', jwtToken)

    axios.defaults.headers.common['Authorization'] = jwtToken;
};