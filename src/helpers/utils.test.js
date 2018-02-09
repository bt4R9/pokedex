const utils = require('./utils');

describe('utils', () => {
    let node = {
        getBoundingClientRect: () => ({
            x: 100,
            y: 200
        }),
        clientWidth: 100,
        clientHeight: 100
    };

    beforeEach(() => {
        global.innerWidth = 640;
        global.innerHeight = 480;
    });

    it('should return animation params', () => {
        expect(utils.animateZoom(node)).toEqual({
            shiftX: 170,
            shiftY: -10,
            scaleX: 6.528,
            scaleY: 4.896
        });
    });
});
