import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pokemons from '../components/Pokemons/Pokemons';
import getPokemons from '../selectors/pokemons';
import { changePage } from '../actions/paginator';
import { togglePopup } from '../actions/popup';

const mapStateToProps = state => {
    const { pokemons, hasNext } = getPokemons(state);

    return {
        pokemons,
        hasNext,
        page: state.paginator.page
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({ changePage, togglePopup }, dispatch);

class PokemonsContainer extends React.PureComponent {
    static propTypes = {
        changePage: PropTypes.func.isRequired,
        togglePopup: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        pokemons: PropTypes.array,
        hasNext: PropTypes.bool.isRequired
    }

    changePage = count => () => this.props.changePage(this.props.page + count);

    render() {
        const { pokemons, hasNext, page, togglePopup } = this.props;

        return (
            <Pokemons
                pokemons={ pokemons }
                togglePopup={ togglePopup }
                hasNext={ hasNext }
                hasPrev={ page - 1 > 0 }
                onNextPage={ this.changePage(1) }
                onPrevPage={ this.changePage(-1) }
                page={ page }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsContainer);
