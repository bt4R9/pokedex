const path = require('path');
const fs = require('fs');
const got = require('got');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);
const { getId, normalize, write, humanSize, getProgressStats, formatTime } = require('./utils');
const buildIndecies = require('./indecies');
const config = require('../config/pokeapi.config.json');
const isResultExists = fs.existsSync(path.join(__dirname, config.filename));

const timings = {
    step1: { start: null, end: null }
};
const getStats = getProgressStats();

let result = {};

if (isResultExists) {
    result = require(path.join(__dirname, config.filename));
}

const parseResponse = response => {
    const { name, weight, sprites, height, id } = response;

    const abilities = normalize(response.abilities);
    const stats = normalize(response.stats);
    const species = normalize(response.species);
    const types = normalize(response.types);

    return {
        abilities: abilities.map(item => ({ name: item.ability.name, id: getId(item.ability.url) })),
        stats: stats.map(item => ({ name: item.stat.name, value: item.base_stat })),
        name,
        weight,
        avatar: { front: sprites.front_default, back: sprites.back_default },
        height,
        species: species.map(({ name }) => ({ name })),
        id,
        types: types.map(item => ({ name: item.type.name, id: getId(item.type.url) }))
    };
};

async function requestPokemons() {
    console.log('Step 1. Retrieving pokemons from https://pokeapi.co/.');
    console.log('Hint: Take some tea... It\'ll take about 20 - 30 minutes.')

    timings.step1.start = Date.now();
    for (var id = 1; id <= config.count; id++) {
        const loopStart = Date.now();

        if (!result[id]) {
            try {
                const response = await got(`${config.endpoint}${config.resourcePokemon}${id}/`, config.requestParams);
                const info = await parseResponse(response.body);
                result[id] = info;
            } catch (e) {
                console.log('\nAn error occurred, the result will be saved before exiting.');
                await writeFile(path.join(__dirname, config.filename), JSON.stringify(result), 'utf8');
                throw new Error(e);
            }
        }

        const stats = getStats(Date.now() - loopStart, config.count, id);

        const c_percent = `[${stats.percent}%]`;
        const c_slowest = `[slowest=${stats.slowest}]`;
        const c_fastest = `[fastest=${stats.fastest}]`;
        const c_avarage = `[avarage=${stats.avarage}]`;
        const c_elapsed = `[${id}/${config.count}]`;
        const c_remains = `[remaining=${stats.remains}]`;
    
        write(`${c_percent} ${c_remains} ${c_avarage} ${c_slowest} ${c_fastest} ${c_elapsed}`);
    }
    timings.step1.end = Date.now();
    timings.step1.diff = timings.step1.end - timings.step1.start;

    write(`Completed. It took ${formatTime(timings.step1.diff)} minutes.`);
    console.log('\n');
    console.log(`Step 2. Saving pokemons into file ${config.filename}.`);

    await writeFile(path.join(__dirname, config.filename), JSON.stringify(result), 'utf8');
    const pokemonsStats = await stat(path.join(__dirname, config.filename));

    console.log(`Completed. File size is ${humanSize(pokemonsStats.size)}.`);
    console.log(`\nStep 3. Building indices into file ${config.indecies}.`);

    const indecies = buildIndecies(result);
    await writeFile(path.join(__dirname, config.indecies), JSON.stringify(indecies), 'utf8');
    const indeciesStats = await stat(path.join(__dirname, config.indecies));

    console.log(`Completed. File size is ${humanSize(indeciesStats.size)}.`);

    console.log(`\nStep 4. Copying files into ${config.folder} folder.`);
    fs.copyFileSync(path.join(__dirname, config.filename), path.join(__dirname, '../data', config.filename));
    fs.copyFileSync(path.join(__dirname, config.indecies), path.join(__dirname, '../data', config.indecies));
    console.log('Completed');

    console.log('\nFinish.')
};

requestPokemons().catch(console.log.bind(console));
