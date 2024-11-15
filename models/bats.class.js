class Bats extends MovableObject {
  y = 0;
  height = 170;
  width = 170;
  currentImage = 0;
  IMAGES_WALKING = [
    "img/bat/bat-1.png",
    "img/bat/bat-2.png",
    "img/bat/bat-3.png",
    "img/bat/bat-4.png",
  ];

  constructor() {
    super();
    this.loadImage("img/bat/bat-1.png");
    this.x = 700;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 4;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000/60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
