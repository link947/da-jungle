class MovableObject {
  img;
  imgCache = {};
  speed = 0.15;
  speedY = 0;
  acceleration = 2.6;
  x = 0;
  y = 0;
  width = 50;
  height = 50;
  offsetY = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y <= 265;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  getImageFromCache(path) {
    return this.imgCache[path];
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }

  draw(ctx) {
    if (this.img) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Slime || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width >= mo.x && 
      this.x <= mo.x + mo.width && 
      this.y + this.offsetY + this.height >= mo.y &&
      this.y + this.offsetY <= mo.y + mo.height && 
      mo.onCollisionCourse 
    );
  }
}
