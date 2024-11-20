class Level {
    slimes = [];
    bats = [];
    backgroundObjects = [];
    coins = [];
    fallingAxes = [];
    level_end_x = 2000;

    constructor(backgroundObjects = [], coins = []) {
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.createSlimes(5);
        this.createBats(50);
        this.createCoins(5);
    }

    createBats(numBats) {
        const canvasHeight = 480;
        const canvasWidth = 720;

        for (let i = 0; i < numBats; i++) {
            const x = 720 + Math.random() * canvasWidth * 40;
            const y = (Math.random() * canvasHeight) / 3;
            const speed = Math.random() * 3 + 2;

            const bat = new Bats(x, y, speed);
            this.bats.push(bat);
        }
    }

    createSlimes(numSlimes) {
        const canvasWidth = 720;

        for (let i = 0; i < numSlimes; i++) {
            const x = 720 + Math.random() * canvasWidth * 3;
            const speed = Math.random() * 2;

            const slime = new Slime(x, speed);
            this.slimes.push(slime);
        }
    }

    createCoins(numCoins) {
        const canvasWidth = 720;

        for (let i = 0; i < numCoins; i++) {
            const x = 150 + Math.random() * canvasWidth * 2;
            const coin = new Coins(x);
            this.coins.push(coin);
        }
    }
}
