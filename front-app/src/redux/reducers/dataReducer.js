import {SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, NO_MORE_DATA, DELETE_POST, CREATE_POST, SET_USER_SEARCH_SUGGESTIONS, LOADING_SEARCH_SUGGESTION_DATA} from '../types';

const initialState = {
    userSearchSuggestions: [],
    loadingSearchSuggestion: false,
    posts: [],
    post: {},
    loading: false,
    hasMore: true,
    currentIndex: 0,
    step: 10
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case LOADING_SEARCH_SUGGESTION_DATA:
            return {
                ...state,
                loadingSearchSuggestion: true
            }
        case SET_POSTS:
            return{
                ...state,
                posts: state.posts.concat(action.payload),
                loading: false,
                currentIndex: state.currentIndex + state.step
            }
        case LIKE_POST:
        case UNLIKE_POST:
            let index = state.posts.findIndex((post) => post.idPost === action.payload.idPost );
            state.posts[index] = action.payload;
            return{
                ...state,
            }
        case NO_MORE_DATA:
            return{
                ...state,
                loading: false,
                hasMore: false
            }
        case DELETE_POST:
            index = state.posts.findIndex(post => post.idPost === action.payload);
            state.posts.splice(index, 1);
            return{
                ...state
            }
        case CREATE_POST:
            return{
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case SET_USER_SEARCH_SUGGESTIONS:
            return{
                ...state,
                userSearchSuggestions: action.payload,
                loadingSearchSuggestion: false,
            }
        default:
            return state;

    }
}