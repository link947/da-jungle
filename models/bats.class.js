class Bats extends MovableObject {
  height = 50;
  width = 50;
  IMAGES_WALKING = [
    "img/bat/bat-1.png",
    "img/bat/bat-2.png",
    "img/bat/bat-3.png",
    "img/bat/bat-4.png",
  ];

  constructor(x, y, speed) {
    super();
    this.loadImage("img/bat/bat-1.png");
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  remove() {
    const index = level1.bats.indexOf(this);
    if (index > -1) {
      level1.bats.splice(index, 1);
    }
  }
}
