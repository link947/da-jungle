class Level {
  slimes = [];
  bats = [];
  backgroundObjects = [];
  level_end_x = 2000;

  constructor(backgroundObjects = []) {
    this.backgroundObjects = backgroundObjects;
    this.createSlimes(5);
    this.createBats(50);
  }

  createBats(numBats) {
    const canvasHeight = 480;
    const canvasWidth = 720;

    for (let i = 0; i < numBats; i++) {
      const x = Math.random() * canvasWidth * 40;
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
}
