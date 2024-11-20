class Coins extends MovableObject {
  height = 50;
  width = 50;
  IMAGES_TURNING = [
    "img/8_coin/icon-coin-1.png",
    "img/8_coin/icon-coin-2.png",
    "img/8_coin/icon-coin-3.png",
    "img/8_coin/icon-coin-4.png",
  ];

  constructor(x) {
    super();
    this.loadImages(this.IMAGES_TURNING);
    this.x = x;
    this.y = 350;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_TURNING);
    }, 150);
  }
}