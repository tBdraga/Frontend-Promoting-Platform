import { SET_POSTS, LOADING_DATA, LIKE_POST, UNLIKE_POST, NO_MORE_DATA, DELETE_POST, CLEAR_ERRORS, SET_ERRORS, CREATE_POST, LOADING_UI, SET_USER_SEARCH_SUGGESTIONS, LOADING_SEARCH_SUGGESTION_DATA, LOADING_SEARCH_RESULT_DATA, SET_USER_SEARCH_RESULTS, CLEAR_USER_SEARCH_SUGGESTIONS } from '../types';
import axios from 'axios';

export const getPostsPaginated = (url, startPosition, step) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios.post(url, null, {
        params: {
            startPosition: startPosition,
            step: step
        }
    })
        .then((res) => {
            if (res.data) {
                dispatch({
                    type: SET_POSTS,
                    payload: res.data
                })
            } else {
                console.log('RECOMANDARI LISTA GOALA');
                dispatch({
                    type: NO_MORE_DATA,
                    payload: []
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SET_POSTS,
                payload: []
            })
        });

}

export const getNextPostsPaginated = (url, startPosition, step) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

}

export const likePost = (url, postId, userId) => (dispatch) => {
    axios.post(url, null, {
        params: {
            idUser: userId,
            idPost: postId
        }
    })
        .then((res) => {
            dispatch({
                type: LIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const unlikePost = (url, postId, userId) => (dispatch) => {
    axios.post(url, null, {
        params: {
            idUser: userId,
            idPost: postId
        }
    })
        .then((res) => {
            dispatch({
                type: UNLIKE_POST,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

export const deletePost = (url, postId) => (dispatch) => {
    axios.post(url, null, {
        params: {
            postId: postId
        }
    })
        .then(() => {
            dispatch({
                type: DELETE_POST,
                payload: postId
            })
        })
        .catch(err => console.log(err));
}

export const createPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios.post('/posts/createPost', newPost)
        .then(res => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });

            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserSearchSuggestions = (searchString) => (dispatch) => {
    dispatch({ type: LOADING_SEARCH_SUGGESTION_DATA });

    const url = '/users/findUsersSuggestionsByNameContaining/' + searchString;

    axios.get(url)
        .then(res => {
            dispatch({
                type: SET_USER_SEARCH_SUGGESTIONS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: SET_USER_SEARCH_SUGGESTIONS,
                payload: []
            }))
}

export const getUserSearchResult = (searchString) => (dispatch) => {
    dispatch({ type: LOADING_SEARCH_RESULT_DATA });

    const url = '/users/findUsersByNameContaining/' + searchString;

    axios.get(url)
        .then(res => {
            dispatch({
                type: SET_USER_SEARCH_RESULTS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: SET_USER_SEARCH_RESULTS,
                payload: []
            }))
}

export const clearSearchSuggestions =() => (dispatch) => {
    dispatch({ type: CLEAR_USER_SEARCH_SUGGESTIONS });
}