class Slime extends MovableObject {
  y = 297;
  height = 170;
  width = 170;
  currentImage = 0;
  IMAGES_WALKING = [
    "img/enemie_slime/slime_run-1.png",
    "img/enemie_slime/slime_run-2.png",
    "img/enemie_slime/slime_run-3.png",
    "img/enemie_slime/slime_run-4.png",
  ];

  constructor() {
    super();
    this.loadImage("img/enemie_slime/slime_run-1.png");
    this.x = 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.15 + Math.random() * 0.5;
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
}
