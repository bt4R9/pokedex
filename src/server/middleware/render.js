module.exports = (req, res, next) => {
    return res.render('index', {
        store: JSON.stringify({
            pokemons: {},
            lits: {}
        })
    });
};
