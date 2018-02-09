import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeQuery } from '../actions/search';
import { changeSize } from '../actions/paginator';
import PokemonsSearch from '../components/PokemonsSearch/PokemonsSearch';

const mapStateToProps = state => ({
    query: state.search.query,
    size: state.paginator.size,
    page: state.paginator.page,
    count: state.config.count
});
const mapDispatchToProps = dispatch => bindActionCreators({
    onChangeQuery: changeQuery,
    onChangeSize: changeSize
}, dispatch);

class PokemonsSearchContainer extends React.PureComponent {
    static propTypes = {
        onChangeQuery: PropTypes.func.isRequired,
        onChangeSize: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        query: PropTypes.string.isRequired
    }

    onChangeQuery = e => this.props.onChangeQuery(e.target.value)
    onChangeSize = e => {
        const { page, count, onChangeSize } = this.props;
        const value = e.target.value;

        if (value * page > count) {
            onChangeSize(this.props.size);
        } else {
            onChangeSize(value);
        }
    }

    render() {
        return (
            <PokemonsSearch
                query={ this.props.query }
                size={ this.props.size }
                onChangeQuery={ this.onChangeQuery }
                onChangeSize={ this.onChangeSize }
            />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsSearchContainer);
