import actions from '../actionTypes';

const defaultState = {
    query: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case actions.SEARCH_CHANGE_QUERY:
            return { ...state, query: action.query };
        default:
            return state;
    }
};
