import { createSelector } from 'reselect';
import range from 'lodash/range';
import uniq from 'lodash/uniq';

export default createSelector(
    [
        state => state.pokemons,
        state => state.search.query,
        state => state.names,
        state => state.types,
        state => state.paginator.page,
        state => state.paginator.size,
        state => state.config.count
    ],
    (pokemons, query, names, types, page, size, count) => {
        const start = (page * size) - size + 1;
        const end = page * size + 1;

        if (query) {
            const resultByNames = Object
                .keys(names)
                .reduce((result, name) => {
                    if (name.includes(query)) {
                        return result.concat(pokemons[names[name]]);
                    }

                    return result;
                }, []);

            const resultByTypes = Object
                .keys(types)
                .reduce((result, type) => {
                    if (type.includes(query)) {
                        return result.concat(types[type]);
                    }

                    return result;
                }, [])
                .map(id => pokemons[id]);

            const searchResult = [].concat(resultByNames, resultByTypes);
            const result = uniq(searchResult).slice(start - 1, end - 1);

            return {
                pokemons: result,
                hasNext: Boolean(searchResult[end])
            };
        }

        const result = range(start, Math.min(end, count + 1)).map(id => pokemons[id]);

        return {
            pokemons: result,
            hasNext: Boolean(pokemons[end + 1])
        };
    }
);
