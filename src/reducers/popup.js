import actions from '../actionTypes';

const defaultState = {};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.POPUP_CLOSE:
            return {
                ...state,
                state: 'closed'
            };
        case actions.POPUP_OPEN:
            return {
                ...state,
                state: 'opened',
                id: action.id,
                animation: action.animation
            };
        default:
            return state;
    }
};
