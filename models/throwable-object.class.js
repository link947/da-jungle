class ThrowableObject extends MovableObject {
  IMAGES_THROWING = [
    "img/6_salsa_bottle/axe-rotation/ThrowingAxe01.png",
    "img/6_salsa_bottle/axe-rotation/ThrowingAxe02.png",
    "img/6_salsa_bottle/axe-rotation/ThrowingAxe03.png",
    "img/6_salsa_bottle/axe-rotation/ThrowingAxe04.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/ThrowingAxe01.png");
    this.loadImages(this.IMAGES_THROWING);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 80;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
      this.rotationAngle += 10;
    }, 25);

    setInterval(() => {
      this.playAnimation(this.IMAGES_THROWING);
    }, 100);
  }
}
