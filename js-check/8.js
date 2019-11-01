class Planet {
    constructor(name, radius) {
        this.name = typeof name === 'string' ? name : '';
        this.radius = typeof radius === 'number' && Number.isFinite(radius) && radius >= 0 ? radius : 0;
    }

    getVolume() {
        return 4 / 3 * Math.PI * (this.radius ** 3);
    }

    describe() {
        return `Планета ${this.name} має об'єм ${this.getVolume().toFixed(2)} м3`;
    }
}

class Earth extends Planet {
    constructor() {
        super('Земля', 6371);
    }
}

module.exports = { Planet, Earth };