import actions from '../actionTypes';

export const changeSize = size => dispatch => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });

    dispatch({
        type: actions.PAGINATOR_CHANGE_SIZE,
        size
    });
};

export const changePage = page => dispatch => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });

    dispatch({
        type: actions.PAGINATOR_CHANGE_PAGE,
        page
    });
};
