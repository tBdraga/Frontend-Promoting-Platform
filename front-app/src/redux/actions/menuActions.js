import { OPEN_MENU, CLOSE_MENU } from '../types';

export const openPostMenu = (anchorEl) => (dispatch) => {
    dispatch({ 
        type: OPEN_MENU,
        payload: anchorEl
     });
}

export const closePostMenu = () => (dispatch) => {
    dispatch({ type: CLOSE_MENU });
}