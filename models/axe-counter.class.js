class AxeCounter extends DrawableObject {
  AXE_IMAGE = "img/6_salsa_bottle/ThrowingAxe01.png";
  axeCount = 20;

  constructor() {
    super();
    this.loadImage(this.AXE_IMAGE);
    this.x = 15;
    this.y = 90;
    this.width = 40;
    this.height = 40;
  }

  increaseAxeCount() {
    this.axeCount++;
  }

  decreaseAxeCount() {
    if (this.axeCount > 0) {
      this.axeCount--;
    }
  }

  render(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = "26px Pixelify Sans";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.strokeText(this.axeCount, this.x + this.width + 5, this.y + this.height / 2 + 8);
    ctx.fillStyle = "white";
    ctx.fillText(this.axeCount, this.x + this.width + 5, this.y + this.height / 2 + 8);
  }
}
