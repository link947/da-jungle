class BackgroundObject extends MovableObject {
  height = 480;
  width = 720;

  constructor(imgPath, x) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = 480 - this.height;
  }
}