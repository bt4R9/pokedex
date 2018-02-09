import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Paginator.css';

class Paginator extends React.PureComponent {
    static propTypes = {
        page: PropTypes.number,
        hasNext: PropTypes.bool,
        hasPrev: PropTypes.bool,
        onNextPage: PropTypes.func,
        onPrevPage: PropTypes.func
    }

    static defaultProps = {
        page: 1,
        hasNext: false,
        hasPrev: false,
        onNextPage: () => {},
        onPrevPage: () => {}
    }

    render() {
        const { page, hasNext, hasPrev, onNextPage, onPrevPage } = this.props;

        if (!hasNext && !hasPrev) {
            return null;
        }

        const previousClassName = cn({
            'Paginator-hidden': !hasPrev
        }, 'Paginator-item Paginator-previous');
        const nextClassName = cn({
            'Paginator-hidden': !hasNext
        }, 'Paginator-item Paginator-next');

        return (
            <div className="Paginator">
                <button
                    onClick={ onPrevPage }
                    className={ previousClassName }
                    disabled={ !hasPrev }
                >
                    { page - 1 }
                </button>
                <button className="Paginator-item Paginator-current">
                    { page }
                </button>
                <button
                    onClick={ onNextPage }
                    className={ nextClassName }
                    disabled={ !hasNext }
                >
                    { page + 1 }
                </button>
            </div>
        );
    }
}

export default Paginator;
