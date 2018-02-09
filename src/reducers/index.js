import { combineReducers } from 'redux';
import pokemons from './pokemons';
import types from './types';
import names from './names';
import paginator from './paginator';
import search from './search';
import config from './config';
import popup from './popup';

export default combineReducers({
    pokemons,
    types,
    names,
    paginator,
    search,
    config,
    popup
});
