const { Planet, Earth } = require('../8');

describe('Planet', () => {
    it('validates the "name" and "radius" params correctly', () => {
        const planet1 = new Planet('Test', 1);
        expect(planet1.name).toBe('Test');
        expect(planet1.radius).toBe(1);

        const planet2 = new Planet();
        expect(planet2.name).toBe('');
        expect(planet2.radius).toBe(0);

        const planet3 = new Planet(null, false);
        expect(planet3.name).toBe('');
        expect(planet3.radius).toBe(0);

        const planet4 = new Planet(123, -100);
        expect(planet4.name).toBe('');
        expect(planet4.radius).toBe(0);

        const planet5 = new Planet('', Infinity);
        expect(planet5.name).toBe('');
        expect(planet5.radius).toBe(0);
    });

    it('calculates the volume correctly', () => {
        const planet1 = new Planet('Test', 2);
        expect(planet1.getVolume()).toBe(4 / 3 * Math.PI * 2 ** 3);

        const planet2 = new Planet('Test', 0);
        expect(planet2.getVolume()).toBe(0);

        const planet3 = new Planet('Test', -Infinity);
        expect(planet3.getVolume()).toBe(0);
    });

    it('produces the info about the planet correctly', () => {
        const planet1 = new Planet('Test', 2);
        const volume = 4 / 3 * Math.PI * 2 ** 3;
        expect(planet1.describe()).toBe(`Планета Test має об'єм ${volume.toFixed(2)} м3`);
    });
});

describe('Earth', () => {
    it('saves the "name" and "radius" params correctly', () => {
        const somePlanet = new Earth();
        expect(somePlanet.name).toBe('Земля');
        expect(somePlanet.radius).toBe(6371);
    });

    it('produces the info about the planet correctly', () => {
        const planet1 = new Earth();
        const volume = 4 / 3 * Math.PI * 6371 ** 3;
        expect(planet1.describe()).toBe(`Планета Земля має об'єм ${volume.toFixed(2)} м3`);
    });
});