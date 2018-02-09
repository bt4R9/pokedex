import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore';
import initialState from '../../store/mock';

import PokemonsSearchContainer from '../../containers/PokemonsSearchContainer';
import PaginatorContainer from '../../containers/PaginatorContainer';
import PokemonsContainer from '../../containers/PokemonsContainer';
import PopupContainer from '../../containers/PopupContainer';

const store = configureStore(initialState);

export default () => (
    <Provider store={ store }>
        <BrowserRouter>
            <div className="App">
                <PokemonsSearchContainer />
                <PaginatorContainer />
                <PokemonsContainer />
                <PaginatorContainer />
                <PopupContainer />
            </div>
        </BrowserRouter>
    </Provider>
);
