class World {
  keyboard = new Keyboard();
  character = new Character();
  endboss = new Endboss();
  slime = new Slime();
  level = level1;
  f;
  canvas;
  ctx;
  camera_x;
  statusBar = new StatusBar();
  coinCounter = new CoinCounter();
  axeCounter = new AxeCounter();
  throwableObjects = [];

  coinAudio = new Audio("audio/coin.wav");
  axeAudio = new Audio("audio/pickup.wav");

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.setWorld();
    this.draw = this.draw.bind(this);
    this.draw();
    this.run();
    this.isThrowingCooldown = false;
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowobject();
      this.throwableObjects.forEach((axe) => {
        axe.checkHit([...this.level.slimes, ...this.level.bats, this.endboss]);
      });
    }, 200);
  }

  checkThrowobject() {
    if (this.keyboard.D && !this.isThrowingCooldown && this.axeCounter.axeCount > 0) {
      let axe = new ThrowableObject(this.character.x, this.character.y);
      this.throwableObjects.push(axe);

      this.axeCounter.decreaseAxeCount();

      this.isThrowingCooldown = true;

      setTimeout(() => {
        this.isThrowingCooldown = false;
      }, 1000);
    }
}


  checkCollisions() {
    const collidableObjects = [
      ...this.level.slimes,
      ...this.level.bats,
      this.endboss,
    ];

    collidableObjects.forEach((object) => {
      if (this.character.isColliding(object)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });

    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coinAudio.play();
        this.coinCounter.increaseCoins();
        this.level.coins.splice(index, 1);
      }
    });

    this.level.fallingAxes.forEach((axe, index) => {
      if (this.character.isColliding(axe)) {
        this.axeAudio.play();
        this.axeCounter.increaseAxeCount();
        this.level.fallingAxes.splice(index, 1);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.fallingAxes);
    this.character.draw(this.ctx);
    this.addObjectsToMap(this.level.bats);
    this.addObjectsToMap(this.level.slimes);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.coinCounter.render(this.ctx);
    this.axeCounter.render(this.ctx);
    this.ctx.restore();
    requestAnimationFrame(this.draw.bind(this))
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    if (mo.img) {
      this.ctx.imageSmoothingEnabled = false;
      mo.draw(this.ctx);
    }
  }
}
