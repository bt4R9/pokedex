import actions from '../actionTypes';

export const togglePopup = (id, animation) => (dispatch, getState) => {
    const popupState = getState().popup.state;
    const isClosed = popupState === 'closed';
    const actionType = isClosed ? actions.POPUP_OPEN : actions.POPUP_CLOSE;

    if (isClosed) {
        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
    }

    dispatch({ type: actionType, id, animation });
};
