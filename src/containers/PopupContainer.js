import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from '../components/Popup/Popup';

const mapStateToProps = state => ({
    popupState: state.popup.state,
    pokemon: state.pokemons[state.popup.id]
});

class PopupContainer extends React.PureComponent {
    static propTypes = {
        popupState: PropTypes.string.isRequired,
        pokemon: PropTypes.shape({
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
        })
    }

    render() {
        return (
            <Popup
                state={ this.props.popupState }
                { ...this.props.pokemon }
            />
        );
    }
}

export default connect(mapStateToProps, null)(PopupContainer);
