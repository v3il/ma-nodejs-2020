const { Planet, Earth } = require('../8');

describe('Planet', () => {
    it('stores "name" and "radius" params correctly', () => {
        const somePlanet = new Planet('Test', 1);
        expect(somePlanet.name).toBe('Test');
        expect(somePlanet.radius).toBe(1);
    });
});

describe('Earth', () => {
    it('stores "name" and "radius" params correctly', () => {
        const somePlanet = new Earth();
        expect(somePlanet.name).toBe('Земля');
        expect(somePlanet.radius).toBe(6371);
    });
});