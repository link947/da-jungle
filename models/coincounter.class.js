class CoinCounter extends DrawableObject {
  COIN_IMAGE = "img/8_coin/icon-coin-1.png";
  coinCount = 0;

  constructor() {
    super();
    this.loadImage(this.COIN_IMAGE);
    this.x = 25;
    this.y = 60;
    this.width = 30;
    this.height = 30;
  }

  increaseCoins() {
    this.coinCount++;
  }

  render(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = "26px Pixelify Sans";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.strokeText(this.coinCount, this.x + this.width + 5, this.y + this.height / 2 + 8);
    ctx.fillStyle = "white";
    ctx.fillText(this.coinCount, this.x + this.width + 5, this.y + this.height / 2 + 8);
  }
  
}
