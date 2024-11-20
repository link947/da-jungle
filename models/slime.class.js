class Slime extends MovableObject {
  y = 357;
  height = 80;
  width = 80;
  IMAGES_WALKING = [
    "img/enemie_slime/slime_run-1.png",
    "img/enemie_slime/slime_run-2.png",
    "img/enemie_slime/slime_run-3.png",
    "img/enemie_slime/slime_run-4.png",
  ];

  constructor(x, speed) {
    super();
    this.loadImage("img/enemie_slime/slime_run-1.png");
    this.x = x;
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
    const index = level1.slimes.indexOf(this);
    if (index > -1) {
      level1.slimes.splice(index, 1);
    }
  }
}
