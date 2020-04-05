import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    idUser: 2,
    //notifications: []
}

export default function( state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return{
                ...state,
                loading: true
            };
        case LIKE_POST:
            return{
                ...state,
                likes: [
                    ...state.likes,
                    {
                        idPost: action.payload.idPost,
                        status: action.payload.status,
                        description: action.payload.description,
                        creationDate: action.payload.creationDate,
                        likes: action.payload.likes,
                        dislikes: action.payload.dislikes,
                        mediaFilePath: action.payload.mediaFilePath,
                        idUser: action.payload.idUser,
                        comments: action.payload.comments,
                        postRecommendations: action.payload.postRecommendations,
                        postLikes: action.payload.postLikes
                    }
                ]
            };
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.idPost !== action.payload.idPost
                )
            };
        default:
            return state;
    }
}