import { OPEN_MENU, CLOSE_MENU, OPEN_COMMENT_SECTION, CLOSE_COMMENT_SECTION } from '../types';

export const openPostMenu = (anchorEl) => (dispatch) => {
    dispatch({
        type: OPEN_MENU,
        payload: anchorEl
    });
}

export const closePostMenu = () => (dispatch) => {
    dispatch({ type: CLOSE_MENU });
}

export const openCommentSection = () => (dispatch) => {
    dispatch({ type: OPEN_COMMENT_SECTION });
}

export const closeCommentSection = () => (dispatch) => {
    dispatch({ type: CLOSE_COMMENT_SECTION });
}