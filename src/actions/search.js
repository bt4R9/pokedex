import actions from '../actionTypes';

export const changeQuery = query => dispatch => dispatch({
    type: actions.SEARCH_CHANGE_QUERY,
    query
});
