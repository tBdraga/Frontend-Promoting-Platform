import {SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA, NO_MORE_DATA, DELETE_POST, CREATE_POST, SET_USER_SEARCH_SUGGESTIONS, LOADING_SEARCH_SUGGESTION_DATA, LOADING_SEARCH_RESULT_DATA, SET_USER_SEARCH_RESULTS, CLEAR_USER_SEARCH_SUGGESTIONS, LOADING_COMMENT_SECTION_DATA, SET_COMMENT_SECTION_DATA, ADD_NEW_POST_COMMENT, LOADING_POST_REPORTS, ADD_POST_REPORTS, REMOVE_POST_REPORT_FROM_QUEUE, LOADING_RECOMMENDATIONS, SET_RECOMMEDATIONS, LOADING_INSPECTED_USER, SET_INSPECTED_USER, LOADING_INSPECTED_USER_POSTS, SET_INSPECTED_USER_POSTS} from '../types';

const initialState = {
    userSearchResult:[],
    loadingSearchResult: false,
    userSearchSuggestions: [],
    loadingSearchSuggestion: false,
    posts: [],
    post: {},
    currentPostComments: [],
    loadingComments: false,
    postReports: [],
    loadingPostReports: false,
    recommendations: [],
    loadingRecommendations: false,
    loading: false,
    hasMore: true,
    currentIndex: 0,
    step: 10,
    inspectedUserDetails: null,
    inspectedUserPosts: [],
    loadingInspectedUserPosts: false,
    loadingInspectedUser: false
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
        case LOADING_SEARCH_RESULT_DATA:
            return{
                ...state,
                loadingSearchResult: true
            }
        case LOADING_COMMENT_SECTION_DATA:
            return{
                ...state,
                loadingComments: true
            }
        case LOADING_POST_REPORTS:
            return{
                ...state,
                loadingPostReports: true
            }
        case LOADING_RECOMMENDATIONS:
            return{
                ...state,
                loadingRecommendations: true
            }
        case LOADING_INSPECTED_USER:
            return{
                ...state,
                loadingInspectedUser: true
            }
        case LOADING_INSPECTED_USER_POSTS:
            return{
                ...state,
                loadingInspectedUserPosts: true
            }
        case SET_INSPECTED_USER:
            return{
                ...state,
                inspectedUserDetails: action.payload,
                loadingInspectedUser: false
            }
        case SET_INSPECTED_USER_POSTS:
            return{
                ...state,
                inspectedUserPosts: action.payload,
                loadingInspectedUserPosts: false
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
        case SET_USER_SEARCH_RESULTS:
            return{
                ...state,
                userSearchResult: action.payload,
                loadingSearchResult: false
            }
        case CLEAR_USER_SEARCH_SUGGESTIONS:
            return{
                ...state,
                userSearchSuggestions: []
            }
        case SET_COMMENT_SECTION_DATA:
            return{
                ...state,
                currentPostComments: action.payload,
                loadingComments: false
            }
        case ADD_NEW_POST_COMMENT:
            return{
                ...state,
                currentPostComments: state.currentPostComments.concat(action.payload),
                loadingComments: false
            }
        case ADD_POST_REPORTS:
            return{
                ...state,
                postReports: action.payload,
                loadingPostReports: false
            }
        case REMOVE_POST_REPORT_FROM_QUEUE:
            index = state.postReports.findIndex(report => report.idReport === action.payload);
            state.posts.splice(index, 1);
            return{
                ...state
            }
        case SET_RECOMMEDATIONS:
            return{
                ...state,
                recommendations: action.payload,
                loadingRecommendations: false
            }
        default:
            return state;

    }
}