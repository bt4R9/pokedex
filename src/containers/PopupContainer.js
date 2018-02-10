import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { togglePopup } from '../actions/popup';
import Popup from '../components/Popup/Popup';

const mapStateToProps = state => ({
    popupState: state.popup.state,
    animation: state.popup.animation,
    pokemon: state.pokemons[state.popup.id]
});
const mapDispatchToProps = dispatch => bindActionCreators({ togglePopup }, dispatch);

class PopupContainer extends React.PureComponent {
    static propTypes = {
        popupState: PropTypes.string.isRequired,
        animation: PropTypes.object,
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
        }),
        togglePopup: PropTypes.func.isRequired
    }

    render() {
        return (
            <Popup
                state={ this.props.popupState }
                animation={ this.props.animation }
                onClose={ this.props.togglePopup }
                { ...this.props.pokemon }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);
