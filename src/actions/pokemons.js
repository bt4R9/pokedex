import actions from '../actionTypes';
import { get } from '../helpers/api';

export const getPokemons = params => dispatch => {
    const { offset, limit } = params;

    dispatch({ type: actions.POKEMONS_FETCH_PENDING });

    get(`/api/pokemons/${offset}/${limit}`)
        .then(response => response.json())
        .then(response => dispatch({
            type: actions.POKEMONS_FETCH_SUCCESS,
            details: response.details,
            pokemons: response.pokemons
        }))
        .catch(() => dispatch({ type: actions.POKEMONS_FETCH_FAILURE }));
};
