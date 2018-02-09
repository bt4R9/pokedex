import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Popup.css';

class Popup extends React.PureComponent {
    static propTypes = {
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
        id: PropTypes.number,
        state: PropTypes.string.isRequired
    }

    renderStats() {
        const stats = this.props.stats.reduce((result, stat) => ({
            ...result, [stat.name]: stat.value
        }), {});

        return (
            <div className="PopupPokemon-stats">
                {
                    ['attack', 'defense', 'special-attack', 'special-defense', 'speed', 'hp'].map(stat => {
                        return (
                            <div key={ stat } className="PopupPokemon-stat">
                                <div className="PopupPokemon-stat-name">
                                    { stat }
                                </div>
                                <div className="PopupPokemon-stat-value">
                                    <div className="PopupPokemon-stat-value-percent">
                                        { stats[stat] }
                                    </div>
                                    <div
                                        className="PopupPokemon-stat-value-graph"
                                        style={ { width: `${stats[stat] / 180 * 100}%` } }
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    renderContent() {
        if (!this.props.name) {
            return null;
        }

        return (
            <div className="Popup-inner">
                <div className="PopupPokemon">
                    <div className="PopupPokemon-title">
                        { this.props.name }
                    </div>
                    <div className="PopupPokemon-line">
                        <div
                            className="PopupPokemon-avatar"
                            style={ { backgroundImage: `url(${this.props.avatar.front})` } }
                        />
                    </div>
                    <div className="PopupPokemon-line-title">
                        Stats
                    </div>
                    <div className="PopupPokemon-line">
                        { this.renderStats() }
                    </div>
                    <div className="PopupPokemon-line-title">
                        Characteristics
                    </div>
                    <div className="PopupPokemon-line">
                        <div className="PopupPokemon-column">
                            <div className="PopupPokemon-content">
                                { `weight ${this.props.weight / 10} kg` }
                            </div>
                        </div>
                        <div className="PopupPokemon-column">
                            <div className="PopupPokemon-content">
                                { `height ${this.props.weight / 100} m` }
                            </div>
                        </div>
                    </div>
                    <div className="PopupPokemon-line-title">
                        Types
                    </div>
                    <div className="PopupPokemon-line">
                        <div className="PopupPokemon-content">
                            {
                                this.props.types.map(type => (
                                    <div key={ type.name } className={ `Pokemon-type-${type.name} PopupPokemon-item` }>
                                        { type.name }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="PopupPokemon-line-title">
                        Abilites
                    </div>
                    <div className="PopupPokemon-line">
                        <div className="PopupPokemon-content">
                            {
                                this.props.abilities.map(ability => (
                                    <div key={ ability.name } className="PopupPokemon-item PopupPokemon-item-bg">
                                        { ability.name }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const className = cn({
            'Popup-active': this.props.state === 'opened'
        }, 'Popup');

        return (
            <div className={ className }>
                { this.renderContent() }
            </div>
        );
    }
}

export default Popup;
