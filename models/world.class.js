class World {
  keyboard = new Keyboard();
  character = new Character();
  level = level1;f
  canvas;
  ctx;
  camera_x;
  statusBar = new StatusBar();
  throwableObjects = [];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.setWorld();
    this.draw = this.draw.bind(this);
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run(){
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowobject();
    }, 200);
  }

  checkThrowobject() {
    if (this.keyboard.D) {
      let axe = new ThrowableObject(this.character.x, this.character.y)
      this.throwableObjects.push(axe);
    }
  }

  checkCollisions(){
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy)
        }
      });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.character.draw(this.ctx);
    this.addObjectsToMap(this.level.bats);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(this.draw);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    if (mo.img) {
      this.ctx.imageSmoothingEnabled = false;
      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);
    }
  }
}
