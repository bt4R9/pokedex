import React from 'react';
import PropTypes from 'prop-types';
import './PokemonsSearch.css';

const PokemonsSearch = ({ query, size, onChangeQuery, onChangeSize }) => (
    <div className="PokemonsSearch">
        <input
            className="PokemonsSearch-input"
            placeholder="name or type"
            type="text"
            value={ query }
            onChange={ onChangeQuery }
        />
        <select
            className="PokemonsSearch-select"
            value={ size }
            onChange={ onChangeSize }
        >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
        </select>
    </div>
);

PokemonsSearch.propTypes = {
    query: PropTypes.string,
    size: PropTypes.number,
    onChangeQuery: PropTypes.func,
    onChangeSize: PropTypes.func
};

PokemonsSearch.defaultProps = {
    query: '',
    size: 25,
    onChangeQuery: () => {},
    onChangeSize: () => {}
};

export default PokemonsSearch;
