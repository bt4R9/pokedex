module.exports = pokemons => {
    const indecies = {
        types: {},
        names: {}
    };
    const types = new Set();

    Object.values(pokemons).forEach(pokemon => {
        pokemon.types.forEach(type => types.add(type.name));
        indecies.names[pokemon.name] = pokemon.id;
    });

    types.forEach(type => {
        indecies.types[type] = new Set();

        Object.values(pokemons).forEach(pokemon => {
            if (pokemon.types.some(pokemonType => pokemonType.name === type)) {
                indecies.types[type].add(pokemon.id);
            }
        });

        indecies.types[type] = Array.from(indecies.types[type]);
    });

    return indecies;
};