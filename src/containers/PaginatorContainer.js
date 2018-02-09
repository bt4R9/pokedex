import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paginator from '../components/Paginator/Paginator';
import getPokemons from '../selectors/pokemons';
import { changePage } from '../actions/paginator';

const mapStateToProps = state => {
    const { hasNext } = getPokemons(state);

    return {
        hasNext,
        page: state.paginator.page
    };
};
const mapDispatchToProps = dispatch => bindActionCreators({ changePage }, dispatch);

class PokemonsContainer extends React.PureComponent {
    static propTypes = {
        changePage: PropTypes.func.isRequired,
        pokemons: PropTypes.array,
        hasNext: PropTypes.bool.isRequired,
        page: PropTypes.number.isRequired
    }

    changePage = count => () => this.props.changePage(this.props.page + count);

    render() {
        const { hasNext, page } = this.props;

        return (
            <Paginator
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
