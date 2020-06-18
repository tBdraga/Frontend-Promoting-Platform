import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_POST, UNLIKE_POST, FOLLOW_USER, UNFOLLOW_USER} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    idUser: null,
    followerList: [],
    followingList: [],
    followingCount: null,
    followerCount: null
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
        case FOLLOW_USER:
            return{
                ...state,
                followingList: [
                    ...state.followingList,
                    {
                        idUser: action.payload.idUser,
                        username: action.payload.username,
                        firstName: action.payload.firstName,
                        lastName: action.payload.lastName
                    }
                ],
                followingCount: state.followingCount + 1
            };
        case UNFOLLOW_USER:
            return{
                ...state,
                followingList: state.followingList.filter(
                    (followedUser) => followedUser.idUser !== action.payload.idUser
                ),
                followingCount: state.followingCount - 1
            };
        default:
            return state;
    }
}