import { OPEN_MENU, CLOSE_MENU, OPEN_COMMENT_SECTION, CLOSE_COMMENT_SECTION } from '../types';

const initialState = {
    isOpen: false,
    anchorEl: null,
    commentSectionIsOpen: false
};

export default function(state = initialState, action){
    switch(action.type){
        case OPEN_MENU:
            return{
                ...state,
                anchorEl: action.payload,
                isOpen: true
            };
        case CLOSE_MENU:
            return{
                ...state,
                isOpen: false,
                anchorEl: null
            };
        case OPEN_COMMENT_SECTION:
            return{
                ...state,
                commentSectionIsOpen: true
            };
        case CLOSE_COMMENT_SECTION:
            return{
                ...state,
                commentSectionIsOpen: false
            };
        default:
            return state;
    }
}