import actions from '../actionTypes';

const defaultState = {};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.PAGINATOR_CHANGE_PAGE:
            return { ...state, page: action.page };
        case actions.PAGINATOR_CHANGE_SIZE:
            return { ...state, size: action.size };
        default:
            return state;
    }
};
