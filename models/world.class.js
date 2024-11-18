class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  camera_x;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.setWorld();
    this.draw = this.draw.bind(this);
    this.draw();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions(){
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          console.log("collision with Character", this.character.energy);
        }
      });
    }, 200);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.character.draw(this.ctx);
    this.addObjectsToMap(this.level.bats);
    this.addObjectsToMap(this.level.enemies);
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
