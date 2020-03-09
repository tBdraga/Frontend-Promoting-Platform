import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/authenticate', userData)
        .then(result => {

            const jwtToken = `Bearer ${result.data.jwtToken}`;

            localStorage.setItem('userJwt', jwtToken)

            axios.defaults.headers.common['Authorization'] = jwtToken;

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
}

export const getUserData = () => (dispatch) => {
    const url = '/users/findByUsername/' + jwtDecode(localStorage.userJwt.split(" ")[1]).sub;

    axios.get(url)
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}