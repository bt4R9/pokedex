const getId = url => url.match(/(\d+)\/$/)[1];
const normalize = prop => Array.isArray(prop) ? prop : [prop];
const write = str => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(str);
};
const humanSize = bytes => {
    const unit = Math.floor( Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, unit)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB'][unit];
};
const pad = n => n < 10 ? `0${n}` : n;
const formatTime = time => {
    const timeinSeconds = time / 1000;
    const minutes = Math.floor(timeinSeconds / 60);
    const seconds = Math.floor(timeinSeconds % 60);

    return `${pad(minutes)}:${pad(seconds)}`;
};
const getProgressStats = () => {
    const timings = [];
    let slowest = -Infinity;
    let fastest = Infinity;

    return (timediff, count, id) => {
        timings.push(timediff);

        if (timediff > slowest) {
            slowest = timediff;
        }

        if (timediff < fastest) {
            fastest = timediff;
        }

        const avarage = timings.reduce((r, c) => r + c, 0) / timings.length;
        const remains = (count - id) * avarage;
        const percent = (id / count * 100).toFixed(2);

        return {
            avarage: formatTime(avarage),
            fastest: formatTime(fastest),
            slowest: formatTime(slowest),
            remains: formatTime(remains),
            percent
        };
    }
}

module.exports = {
    getId,
    normalize,
    write,
    humanSize,
    getProgressStats,
    formatTime
};
