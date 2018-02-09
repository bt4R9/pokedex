import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { animateZoom } from '../../helpers/utils';
import './Pokemon.css';

class Pokemon extends React.PureComponent {
    static propTypes = {
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
        togglePopup: PropTypes.func
    }

    static defaultProps = {
        stats: [],
        types: [],
        name: '',
        avatar: {},
        id: 0,
        togglePopup: () => {}
    }

    state = {
        selected: false,
        style: {}
    }

    selectPokemon = () => {
        const style = animateZoom(this.node);
        this.props.togglePopup(this.props.id);

        if (!this.state.selected) {
            this.setState({ selected: true, style });
        } else {
            setTimeout(() => this.setState({ selected: false, style: {} }), 500);
        }
    }

    getStyle = () => {
        const { shiftX, shiftY, scaleX, scaleY } = this.state.style;

        if (typeof shiftX === 'undefined') {
            return {};
        }

        return { transform: `translate3d(${shiftX}px, ${shiftY}px, 0) scale(${scaleX}, ${scaleY})` };
    }

    render() {
        const { stats, types, name, avatar } = this.props;
        const className = cn({
            'Pokemon-selected': this.state.selected
        }, 'Pokemon');

        return (
            <div
                ref={ node => this.node = node }
                onClick={ this.selectPokemon }
                className={ className }
                style={ this.getStyle() }
            >
                <div className="Pokemon-types Pokemon-types-top">
                    { types.map(type => (
                        <div key={ type.name } className={ `Pokemon-type Pokemon-type-${type.name}` } />
                    )) }
                </div>
                <div className="Pokemon-types Pokemon-types-bottom">
                    { types.map(type => (
                        <div key={ type.name } className={ `Pokemon-type Pokemon-type-${type.name}` } />
                    )) }
                </div>
                <div className="Pokemon-inner">
                    <div className="Pokemon-stat Pokemon-stat-attack">
                        { stats.filter(stat => stat.name === 'attack')[0].value }
                    </div>
                    <div className="Pokemon-stat Pokemon-stat-defense">
                        { stats.filter(stat => stat.name === 'defense')[0].value }
                    </div>
                    <div style={ { backgroundImage: `url(${avatar.front})` } } className="Pokemon-image" />
                    <div className="Pokemon-name">
                        { name }
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokemon;
