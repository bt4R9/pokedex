const type2hex = {
    poison: 'a33ea1',
    grass: '7ac74c',
    fire: 'ee8130',
    flying: 'a98ff3',
    water: '6390f0',
    bug: 'a6b91a',
    normal: 'a8a77a',
    electric: 'f7d02c',
    ground: 'e2bf65',
    fairy: 'd685ad',
    fighting: 'c22e28',
    psychic: 'f95587',
    rock: 'b6a136',
    steel: 'b7b7ce',
    ice: '96d9d6',
    ghost: '735797',
    dragon: '6f35fc',
    dark: '705746'
};

export function animateZoom(node) {
    const rect = node.getBoundingClientRect();

    const wW = window.innerWidth;
    const wH = window.innerHeight;
    const elW = node.clientWidth;
    const elH = node.clientHeight;

    const shiftX = -1 * (wW / 2 - elW / 2 - rect.x);
    const shiftY = -1 * (wH / 2 - elH / 2 - rect.y);
    const scaleX = elW / wW;
    const scaleY = elH / wH;

    return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        shiftX,
        shiftY,
        scaleX,
        scaleY
    };
}

export function generatePokemonGradient(types) {
    if (types.length === 1) {
        return `#${type2hex[types[0].name]}`;
    }

    const start = type2hex[types[0].name];
    const end = type2hex[types[1].name];

    return `linear-gradient(90deg, #${start} 50%, #${end} 50%)`;
}
