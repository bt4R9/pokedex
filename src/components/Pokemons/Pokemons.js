import React from 'react';
import PropTypes from 'prop-types';
import Pokemon from '../Pokemon/Pokemon';
import './Pokemons.css';

class Pokemons extends React.PureComponent {
    static propTypes = {
        pokemons: PropTypes.arrayOf(PropTypes.shape({
            abilities: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string
            })),
            height: PropTypes.number,
            weight: PropTypes.number,
            species: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string
            })),
            stats: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                value: PropTypes.number
            })),
            types: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string
            })),
            name: PropTypes.string,
            avatar: PropTypes.shape({
                front: PropTypes.string,
                back: PropTypes.any
            }),
            id: PropTypes.number
        })),
        togglePopup: PropTypes.func
    }

    static defaultProps = {
        pokemons: [],
        togglePopup: () => {}
    }

    render() {
        const { pokemons, togglePopup } = this.props;

        return (
            <div className="Pokemons">
                {
                    pokemons.map(pokemon => (
                        <Pokemon
                            key={ pokemon.id }
                            togglePopup={ togglePopup }
                            { ...pokemon }
                        />
                    ))
                }
            </div>
        );
    }
}

export default Pokemons;
