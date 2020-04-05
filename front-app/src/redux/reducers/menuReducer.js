import { OPEN_MENU, CLOSE_MENU } from '../types';

const initialState = {
    isOpen: false,
    anchorEl: null
};

export default function(state = initialState, action){
    switch(action.type){
        case OPEN_MENU:
            return{
                ...state,
                anchorEl: action.payload,
                isOpen: true
            }
        case CLOSE_MENU:
            return{
                ...state,
                isOpen: false,
                anchorEl: null
            }
        default:
            return state
    }
}