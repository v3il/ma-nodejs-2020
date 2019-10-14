class Planet {
    constructor(name, radius) {
        this.name = name;
        this.radius = radius;
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

console.log(new Earth().describe());